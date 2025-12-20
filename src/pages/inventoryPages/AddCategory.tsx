import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../lib/db";
import { invoke } from "@tauri-apps/api/core";

// Función auxiliar para convertir File a Base64 usando Promesas
const convertirABase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

function AddCategory() {
    const [name, setName] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false); // Para evitar doble clic

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name || !image) return;

        setLoading(true);

        try {
            // 1. Preparar datos
            const uuid = crypto.randomUUID();
            const extension = image.name.split(".").pop() || "png";
            const nombreArchivo = `${uuid}.${extension}`;
            const subcarpeta = "categorias"; // Nombre físico de la carpeta

            // Ruta relativa completa para guardar en la BD (para usar luego en <img src>)
            // Usamos '/' para que sea compatible web, Rust ya sabe manejarlo.
            const rutaParaBD = `images/${subcarpeta}/${nombreArchivo}`;

            // 2. Convertir imagen a Base64 correctamente
            const base64String = await convertirABase64(image);
            // Quitamos el prefijo "data:image/jpeg;base64," para enviar solo los datos a Rust
            const base64Data = base64String.split(",")[1];

            // 3. Guardar el archivo físico (Llamada a Rust)
            // IMPORTANTE: Los nombres de las claves deben coincidir con los argumentos en main.rs
            await invoke("save_image", {
                subfolder: subcarpeta,
                filename: nombreArchivo,
                base64Data: base64Data, // En Rust le llamamos 'base64_data', Tauri mapea camelCase a snake_case automáticamente
            });

            // Usamos rutaParaBD para que apunte al archivo exacto, no solo a la carpeta
            const sql = `INSERT INTO Categorias_Producto (Nombre, Nombre_Imagen, Ruta_Imagen) VALUES ('${name}', '${nombreArchivo}', '${rutaParaBD}');`;

            await db.execute(sql);

            console.log("Categoría e imagen guardadas con éxito");
            navigate(-1);

        } catch (error) {
            console.error("Error crítico al guardar:", error);
            alert("Hubo un error al guardar la categoría. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative">
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 flex cursor-pointer items-center gap-2 text-negro font-semibold hover:opacity-80 transition"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
                <span>Volver atrás</span>
            </button>

            <form
                onSubmit={handleSubmit}
                className="bg-blanco p-6 rounded-xl shadow-md w-[400px] mx-auto flex flex-col gap-4"
            >
                <h2 className="text-2xl font-bold text-center">
                    Añadir Categoría
                </h2>

                {/* Nombre */}
                <div className="flex flex-col gap-1">
                    <label className="font-semibold">
                        Nombre de la categoría
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-negro rounded-lg px-3 py-2"
                        required
                        disabled={loading}
                    />
                </div>

                {/* Imagen */}
                <div className="flex flex-col gap-2">
                    <label className="font-semibold">
                        Imagen de la categoría
                    </label>

                    <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setImage(e.target.files ? e.target.files[0] : null)
                        }
                        className="hidden"
                        disabled={loading}
                    />

                    <label
                        htmlFor="imageUpload"
                        className={`cursor-pointer border-2 border-dashed rounded-xl px-4 py-6 text-center transition ${image ? "border-verde bg-green-50" : "border-verde"
                            }`}
                    >
                        {image ? (
                            <span className="font-semibold text-verde">
                                {image.name}
                            </span>
                        ) : (
                            <span className="text-negro">
                                Haz clic para subir una imagen
                            </span>
                        )}
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`mt-4 cursor-pointer text-blanco py-2 rounded-xl font-bold transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-verde hover:opacity-90"
                        }`}
                >
                    {loading ? "Guardando..." : "Guardar categoría"}
                </button>
            </form>
        </div>
    );
}

export default AddCategory;