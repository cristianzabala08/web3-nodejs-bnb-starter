import { ethers } from "ethers";
import * as dotenv from "dotenv";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Validación de variables de entorno requeridas
const rpcUrl = process.env.RPC_URL;
const privateKey = process.env.PRIVATE_KEY || process.env.PRIVATE_URL;
const contractAddress = process.env.CONTRACT_ADDRESS;

if (!rpcUrl) {
  console.error("❌ Error: Falta configurar RPC_URL en el archivo .env");
  process.exit(1);
}

if (!privateKey || privateKey.includes("tu_llave_privada")) {
  console.warn("⚠️ Advertencia: PRIVATE_URL no está configurada o contiene el valor de ejemplo. Las funciones de escritura no podrán ejecutarse.");
}

if (!contractAddress || contractAddress.startsWith("0x00000000")) {
  console.warn("⚠️ Advertencia: CONTRACT_ADDRESS no tiene una dirección válida asignada.");
}

// 1. Configurar el proveedor (Provider) conectado a BNB Chain Testnet
const provider = new ethers.JsonRpcProvider(rpcUrl);

// 2. Configurar la billetera (Signer) con la llave privada y el proveedor (si está disponible)
let wallet: ethers.Wallet | null = null;
if (privateKey && !privateKey.includes("tu_llave_privada")) {
  try {
    wallet = new ethers.Wallet(privateKey, provider);
  } catch (err) {
    console.error("❌ Error al instanciar la Wallet con la PRIVATE_KEY suministrada:", err);
  }
}

// 3. ABI mínimo del contrato (Human-Readable ABI)
// Solo incluimos las firmas de las funciones y eventos con los que interactuaremos
const contractABI = [
  "function getMessage() public view returns (string)",
  "function setMessage(string memory _newMessage) public",
  "event MessageUpdated(address indexed author, string newMessage)"
];

// 4. Instanciar el contrato conectándolo al signer (si existe) o al provider
const contract = new ethers.Contract(
  contractAddress || ethers.ZeroAddress,
  contractABI,
  wallet ?? provider
);

async function main() {
  try {
    console.log("==================================================");
    console.log("🚀 Web3 Node.js Starter - BNB Smart Chain Testnet");
    console.log("==================================================");

    // Obtener información básica de la red
    const network = await provider.getNetwork();
    console.log(`🔗 Conectado a la red: Chain ID ${network.chainId}`);

    if (wallet) {
      const balance = await provider.getBalance(wallet.address);
      console.log(`👤 Billetera activa: ${wallet.address}`);
      console.log(`💰 Saldo tBNB: ${ethers.formatEther(balance)} tBNB\n`);
    }

    if (!contractAddress || contractAddress.startsWith("0x00000000")) {
      console.log("ℹ️ Despliega tu contrato en Remix y coloca la dirección en .env para interactuar.");
      return;
    }

    // --- OPERACIÓN 1: LECTURA EN LA BLOCKCHAIN (Gratis / View Call) ---
    console.log("📖 Leyendo mensaje actual desde el Smart Contract...");
    const currentMessage = await contract.getMessage();
    console.log(`👉 Mensaje actual: "${currentMessage}"\n`);

    // --- OPERACIÓN 2: ESCRITURA EN LA BLOCKCHAIN (Requiere gas tBNB) ---
    /*
    if (wallet) {
      console.log("✍️ Enviando nuevo mensaje a la blockchain...");
      const nuevoTexto = "¡Hola desde Node.js y BNB Chain!";
      const tx = await contract.setMessage(nuevoTexto);
      console.log(`⏳ Transacción enviada con hash: ${tx.hash}`);

      console.log("Esperando confirmación del bloque...");
      const receipt = await tx.wait();
      console.log(`✅ Confirmada en el bloque: ${receipt.blockNumber}\n`);
    } else {
      console.log("⚠️ No se puede escribir en el contrato sin una PRIVATE_KEY configurada.");
    }
    */

    // --- OPERACIÓN 3: ESCUCHA DE EVENTOS EN TIEMPO REAL ---
    console.log("🎧 Escuchando eventos 'MessageUpdated' en tiempo real...");
    console.log("Presiona Ctrl+C para finalizar el listener.\n");

    contract.on("MessageUpdated", (author: string, newMessage: string, event: any) => {
      console.log("------------------------------------------");
      console.log("⚡ [EVENTO CAPTURADO] MessageUpdated");
      console.log(`   Autor:      ${author}`);
      console.log(`   Mensaje:    ${newMessage}`);
      console.log(`   Tx Hash:    ${event.log?.transactionHash || "N/A"}`);
      console.log("------------------------------------------");
    });

  } catch (error) {
    console.error("❌ Error al interactuar con el contrato:", error);
  }
}

main();
