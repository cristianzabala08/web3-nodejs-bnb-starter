# 🎓 Curso Práctico Web3: De Solidity a Node.js en la Red de BNB

Plantilla inicial estructurada profesionalmente para conectar aplicaciones backend en **Node.js** y **TypeScript** con contratos inteligentes desplegados en **BNB Smart Chain (BSC Testnet)** usando **Ethers.js v6**.

---

## 📁 Estructura del Repositorio

```text
web3-nodejs-bnb-starter/
├── contracts/
│   └── SimpleStorage.sol      # Contrato inteligente en Solidity (^0.8.20)
├── src/
│   └── index.ts               # Script de integración con Ethers.js
├── .env.example               # Plantilla de variables de entorno seguras
├── .gitignore                 # Reglas de exclusión para Git (seguridad)
├── package.json               # Dependencias y scripts de ejecución
├── tsconfig.json              # Configuración de TypeScript
└── README.md                  # Documentación e instrucciones paso a paso
```

---

## 🛠️ Prerrequisitos

Antes de comenzar, asegúrate de tener:
1. **Node.js** (v18 o superior) y **npm** instalados en tu equipo.
2. Una billetera Web3 (ej. **MetaMask**) configurada para la red **BNB Smart Chain Testnet**.
3. Fondos de prueba (**tBNB**) en tu wallet para pagar tarifas de gas:
   - Faucet oficial de BNB: [BNB Chain Faucet](https://www.bnbchain.org/en/faucet)

---

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd web3-nodejs-bnb-starter
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea tu archivo `.env` a partir de la plantilla:

```bash
# En Windows (PowerShell):
copy .env.example .env

# En Linux / macOS:
cp .env.example .env
```

Edita `.env` con tus credenciales:
```env
RPC_URL=https://bsc-testnet-rpc.publicnode.com
PRIVATE_URL=tu_llave_privada_de_prueba_aqui
CONTRACT_ADDRESS=la_direccion_de_tu_contrato_desplegado_en_remix
```

> [!WARNING]
> **Regla de oro de seguridad:** NUNCA compartas ni subas tu archivo `.env` o tu llave privada a GitHub. Usa siempre llaves de prueba sin valor económico real.

---

## 📜 Despliegue del Smart Contract (Paso a Paso)

1. Abre [Remix IDE](https://remix.ethereum.org/).
2. Copia el contenido del archivo [`contracts/SimpleStorage.sol`](contracts/SimpleStorage.sol) en un nuevo archivo en Remix.
3. En la pestaña **Solidity Compiler**, compila el contrato con la versión `0.8.20` o superior.
4. En la pestaña **Deploy & Run Transactions**:
   - En **Environment**, selecciona **Injected Provider - MetaMask**.
   - Asegúrate de estar conectado a **BNB Smart Chain Testnet** en MetaMask.
   - Haz clic en **Deploy** y confirma la transacción.
5. Copia la dirección del contrato desplegado y pégala en `CONTRACT_ADDRESS` dentro de tu `.env`.

---

## 💻 Ejecución del Proyecto

### Modo Desarrollo (con `ts-node`):
```bash
npm run dev
```

### Compilar a JavaScript y ejecutar:
```bash
npm run build
npm start
```

---

## 🧠 ¿Qué aprenderás con este proyecto?

1. **Lectura de estado (`View Call`):** Cómo consultar información de la blockchain sin pagar comisiones de gas.
2. **Firma y envío de transacciones (`State Mutation`):** Cómo modificar el estado de la red firmando con una `Wallet` y esperando la confirmación del bloque (`tx.wait()`).
3. **Escucha reactiva de eventos (`Event Listeners`):** Cómo suscribirte a eventos en tiempo real emitidos por el Smart Contract para alimentar dashboards o bases de datos off-chain.
4. **Buenas prácticas:** Arquitectura limpia con TypeScript, variables seguras con `dotenv` y ABIs legibles por humanos (*Human-Readable ABI*).

---

## 📄 Licencia

Este proyecto está bajo la Licencia [MIT](LICENSE).
