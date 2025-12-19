import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../lib/db";

function AddCategory() {
    const [name, setName] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const ruta = "/imagens/inventario/categorias";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name || !image) return;

        const uuid = crypto.randomUUID();
        const extension = image!!.name.split(".").pop() || "png";
        const nombreCompleto = uuid + "." + extension;

        const reader = new FileReader();
        await reader.readAsDataURL(image);
        const base64 = reader.result;

        const imagen = {
            name: uuid,
            extension: extension,
            base64: base64,
            ruta: ruta,
        };

        const sql: String = `INSERT INTO Categorias_Producto (Nombre, Nombre_Imagen, Ruta_Imagen) VALUES ('${name}', '${nombreCompleto}', '${ruta}');`;
        await db.execute(sql).then(() => {
            console.log("Categoría creada");
        });

        console.log({ name, image });
    };
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center relative">
            {/* Botón volver */}
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
                    />
                </div>

                {/* Imagen personalizada */}
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
                    />

                    <label
                        htmlFor="imageUpload"
                        className="cursor-pointer border-2 border-dashed rounded-xl px-4 py-6 text-center border-verde"
                    >
                        {image ? (
                            <span className="font-semibold text-verde">
                                {/* {image.name} */}
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
                    className="mt-4 cursor-pointer bg-verde text-blanco py-2 rounded-xl font-bold"
                >
                    Guardar categoría
                </button>
            </form>
        </div>
    );
}

export default AddCategory;
