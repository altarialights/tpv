CREATE TABLE IF NOT EXISTS salones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS mesas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    salon_id INTEGER NOT NULL,
    nombre_visual TEXT NOT NULL, -- Ej: "Mesa 4"
    pos_x REAL DEFAULT 0,
    pos_y REAL DEFAULT 0,
    ancho REAL DEFAULT 80,
    alto REAL DEFAULT 80,
    forma TEXT DEFAULT 'rect',   -- 'rect' o 'circle'
    estado TEXT DEFAULT 'libre', -- 'libre', 'ocupada', 'reservada'
    FOREIGN KEY (salon_id) REFERENCES salones (id)
);

CREATE TABLE IF NOT EXISTS categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    color TEXT DEFAULT '#cbd5e1', 
    orden INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS productos_finales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    categoria_id INTEGER NOT NULL,
    nombre TEXT NOT NULL,
    precio REAL NOT NULL,         -- Precio final con IVA
    iva REAL DEFAULT 0.21,        -- Cambiado a 0.21 como pediste
    imagen TEXT,                  -- Base64 o ruta local
    activo BOOLEAN DEFAULT 1,
    FOREIGN KEY (categoria_id) REFERENCES categorias (id)
);

CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    rol TEXT NOT NULL,            -- 'admin', 'encargado', 'camarero'
    pin_acceso TEXT,              -- Para login rápido
    email TEXT,
    telefono TEXT,
    activo BOOLEAN DEFAULT 1
);

-- Fichajes
CREATE TABLE IF NOT EXISTS fichajes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    tipo TEXT NOT NULL,           -- 'entrada' o 'salida'
    fecha_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    firma_base64 TEXT,
    -- Eliminados latitud/longitud como pediste
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
);

-- --------------------------------------------------------
-- 4. ZONA DE VENTAS
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mesa_id INTEGER,
    usuario_id INTEGER,
    fecha_apertura DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_cierre DATETIME,
    total REAL DEFAULT 0,
    metodo_pago TEXT,
    estado TEXT DEFAULT 'abierto',
    FOREIGN KEY (mesa_id) REFERENCES mesas (id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
);

-- Detalle del Ticket
CREATE TABLE IF NOT EXISTS lineas_ticket (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id INTEGER NOT NULL,
    producto_id INTEGER NOT NULL,
    cantidad INTEGER DEFAULT 1,
    precio_unitario REAL NOT NULL,
    nombre_producto TEXT NOT NULL,
    nota TEXT DEFAULT NULL,
    FOREIGN KEY (ticket_id) REFERENCES tickets (id),
    -- CORREGIDO: Ahora apunta a 'productos_finales' en lugar de 'productos'
    FOREIGN KEY (producto_id) REFERENCES productos_finales (id)
); --------------------------------------------------------

INSERT INTO salones (nombre) VALUES ('Salón Principal');
INSERT INTO categorias (nombre, color) VALUES ('Bebidas', '#3b82f6');
INSERT INTO categorias (nombre, color) VALUES ('Comida', '#ef4444');
INSERT INTO usuarios (nombre, rol, pin_acceso) VALUES ('Admin', 'admin', '0000');