// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title SimpleStorage
 * @dev Contrato pedagógico para el curso de desarrollo Web3 en BNB Smart Chain.
 * Permite almacenar una cadena de texto y notificar cambios mediante eventos.
 */
contract SimpleStorage {
    // Variable de estado persistente en la blockchain
    string private message;
    
    // Dirección del creador o propietario del contrato
    address public owner;

    // Evento emitido al actualizar el mensaje (útil para listeners off-chain en Node.js)
    event MessageUpdated(address indexed author, string newMessage);

    // Modificador de acceso opcional para restringir permisos
    modifier onlyOwner() {
        require(msg.sender == owner, "Solo el owner puede ejecutar esta accion");
        _;
    }

    /**
     * @dev Se ejecuta únicamente durante el despliegue del contrato
     */
    constructor() {
        owner = msg.sender;
        message = "Hola Web3 desde BNB!";
    }

    /**
     * @notice Actualiza el mensaje en el estado del contrato
     * @param _newMessage Nuevo texto que reemplazará al actual
     */
    function setMessage(string memory _newMessage) public {
        message = _newMessage;
        emit MessageUpdated(msg.sender, _newMessage);
    }

    /**
     * @notice Consulta el mensaje actual sin costo de gas (llamada view)
     * @return El string almacenado en la blockchain
     */
    function getMessage() public view returns (string memory) {
        return message;
    }
}
