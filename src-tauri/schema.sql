-- 1. Tablas de Seguridad y Usuarios CREATE TABLE IF NOT EXISTS Roles ( ID_Rol INTEGER PRIMARY KEY AUTOINCREMENT, Nombre_Rol TEXT NOT NULL UNIQUE -- e.g., 'Administrador', 'Camarero' );

CREATE TABLE IF NOT EXISTS Usuarios (
    ID_Usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    ID_Rol INTEGER NOT NULL,
    Email TEXT NOT NULL UNIQUE,
    Password_Hash TEXT NOT NULL,
    Nombre TEXT NOT NULL,
    Apellido TEXT,
    Estado TEXT DEFAULT 'Activo',
    FOREIGN KEY (ID_Rol) REFERENCES Roles(ID_Rol)
);

-- 2. Tablas de Personal y Horarios (Trabajadores)
CREATE TABLE IF NOT EXISTS Trabajadores (
    ID_Trabajador INTEGER PRIMARY KEY AUTOINCREMENT,
    ID_Usuario INTEGER UNIQUE NOT NULL, -- Relación 1:1 con Usuarios
    DNI TEXT UNIQUE,
    Telefono TEXT,
    Puesto TEXT,
    Fecha_Contratacion DATE,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID_Usuario)
);

CREATE TABLE IF NOT EXISTS Turnos (
    ID_Turno INTEGER PRIMARY KEY AUTOINCREMENT,
    Nombre_Turno TEXT NOT NULL, -- e.g., 'Mañana', 'Noche'
    Hora_Inicio TIME,
    Hora_Fin TIME
);

CREATE TABLE IF NOT EXISTS Asignacion_Turnos (
    ID_Asignacion INTEGER PRIMARY KEY AUTOINCREMENT,
    ID_Trabajador INTEGER NOT NULL,
    Fecha DATE NOT NULL,
    ID_Turno INTEGER NOT NULL,
    Area TEXT NOT NULL, -- 'Sala' o 'Cocina'
    FOREIGN KEY (ID_Trabajador) REFERENCES Trabajadores(ID_Trabajador),
    FOREIGN KEY (ID_Turno) REFERENCES Turnos(ID_Turno)
);

-- 3. Tablas de Inventario y Productos
CREATE TABLE IF NOT EXISTS Categorias_Producto (
    ID_Categoria INTEGER PRIMARY KEY AUTOINCREMENT,
    Nombre TEXT NOT NULL UNIQUE,
    Nombre_Imagen TEXT,
    Ruta_Imagen TEXT
);

CREATE TABLE IF NOT EXISTS Productos (
    ID_Producto INTEGER PRIMARY KEY AUTOINCREMENT,
    ID_Categoria INTEGER NOT NULL,
    Nombre TEXT NOT NULL,
    Precio_Venta REAL NOT NULL,
    Stock_Actual REAL DEFAULT 0,
    Stock_Minimo REAL DEFAULT 0,
    Unidad_Medida TEXT,
    FOREIGN KEY (ID_Categoria) REFERENCES Categorias_Producto(ID_Categoria)
);

-- 4. Tablas de Reservas y Mesas
CREATE TABLE IF NOT EXISTS Zonas (
    ID_Zona INTEGER PRIMARY KEY AUTOINCREMENT,
    Nombre_Zona TEXT NOT NULL UNIQUE -- e.g., 'Terraza', 'Principal'
);

CREATE TABLE IF NOT EXISTS Mesas (
    ID_Mesa INTEGER PRIMARY KEY AUTOINCREMENT,
    ID_Zona INTEGER NOT NULL,
    Numero_Mesa TEXT NOT NULL UNIQUE,
    Capacidad INTEGER NOT NULL,
    Ubicacion_X INTEGER,
    Ubicacion_Y INTEGER,
    FOREIGN KEY (ID_Zona) REFERENCES Zonas(ID_Zona)
);

CREATE TABLE IF NOT EXISTS Reservas (
    ID_Reserva INTEGER PRIMARY KEY AUTOINCREMENT,
    ID_Mesa INTEGER NOT NULL,
    Fecha_Reserva DATE NOT NULL,
    Hora_Reserva TIME NOT NULL,
    Num_Personas INTEGER NOT NULL,
    Nombre_Cliente TEXT NOT NULL,
    Telefono TEXT,
    Email TEXT,
    Estado TEXT DEFAULT 'Confirmada', -- 'Confirmada', 'Cancelada', 'Atendida'
    FOREIGN KEY (ID_Mesa) REFERENCES Mesas(ID_Mesa)
);

-- 5. Tablas de Clientes, Proveedores y Marketing
CREATE TABLE IF NOT EXISTS Clientes (
    ID_Cliente INTEGER PRIMARY KEY AUTOINCREMENT,
    Nombre TEXT NOT NULL,
    Apellido TEXT,
    Email TEXT UNIQUE,
    Telefono TEXT,
    Fecha_Alta DATE,
    Total_Gastado REAL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS Proveedores (
    ID_Proveedor INTEGER PRIMARY KEY AUTOINCREMENT,
    Nombre_Empresa TEXT NOT NULL,
    Contacto TEXT,
    Telefono TEXT,
    Email TEXT UNIQUE,
    CIF TEXT UNIQUE,
    Tipo_Producto TEXT -- e.g., 'Alimentos', 'Bebidas', 'Limpieza'
);

-- 6. Tablas de Facturación y Cuentas
CREATE TABLE IF NOT EXISTS Comandas (
    ID_Comanda INTEGER PRIMARY KEY AUTOINCREMENT,
    ID_Mesa INTEGER NOT NULL,
    ID_Trabajador INTEGER, -- Camarero que abre la comanda
    Fecha_Hora_Apertura DATETIME NOT NULL,
    Fecha_Hora_Cierre DATETIME,
    Total_Comanda REAL DEFAULT 0,
    Estado TEXT DEFAULT 'Abierta', -- 'Abierta', 'Pagada', 'Cancelada'
    FOREIGN KEY (ID_Mesa) REFERENCES Mesas(ID_Mesa),
    FOREIGN KEY (ID_Trabajador) REFERENCES Trabajadores(ID_Trabajador)
);

CREATE TABLE IF NOT EXISTS Detalle_Comanda (
    ID_Detalle INTEGER PRIMARY KEY AUTOINCREMENT,
    ID_Comanda INTEGER NOT NULL,
    ID_Producto INTEGER NOT NULL,
    Cantidad REAL NOT NULL,
    Precio_Unitario REAL NOT NULL,
    Notas TEXT,
    FOREIGN KEY (ID_Comanda) REFERENCES Comandas(ID_Comanda),
    FOREIGN KEY (ID_Producto) REFERENCES Productos(ID_Producto)
);

CREATE TABLE IF NOT EXISTS Facturas (
    ID_Factura INTEGER PRIMARY KEY AUTOINCREMENT,
    ID_Comanda INTEGER UNIQUE NOT NULL,
    ID_Cliente INTEGER, -- Opcional, si el cliente pide factura
    Fecha_Emision DATETIME NOT NULL,
    Subtotal REAL NOT NULL,
    IVA REAL NOT NULL,
    Total_Pagado REAL NOT NULL,
    Metodo_Pago TEXT, -- 'Efectivo', 'Tarjeta', 'Bizum'
    FOREIGN KEY (ID_Comanda) REFERENCES Comandas(ID_Comanda),
    FOREIGN KEY (ID_Cliente) REFERENCES Clientes(ID_Cliente)
);

CREATE TABLE IF NOT EXISTS Cuentas_Gastos (
    ID_Gasto INTEGER PRIMARY KEY AUTOINCREMENT,
    Fecha DATE NOT NULL,
    Concepto TEXT NOT NULL,
    Importe REAL NOT NULL,
    Tipo_Gasto TEXT NOT NULL -- e.g., 'Nómina', 'Alquiler', 'Suministros'
);