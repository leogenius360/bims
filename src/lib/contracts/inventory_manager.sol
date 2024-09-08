// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract InventoryManager is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant STOCK_KEEPER_ROLE = keccak256("STOCK_KEEPER_ROLE");

    // Enums
    enum PaymentStatus {
        None,
        PartPayment,
        FullPayment
    }

    // Structs
    struct Product {
        string id;
        string name;
        uint256 price;
        uint256 qty;
        uint256 incoming;
        uint256 outgoing;
        string imageUrl;
        string category;
        string description;
        string latestUpdateBy;
        uint256 latestUpdateDate;
    }

    struct StockProduct {
        string id;
        string name;
        uint256 price;
        uint256 qty;
    }

    struct Supplier {
        string name;
        string email;
        string contact;
        string addr;
    }

    struct StockRequest {
        string id;
        StockProduct[] products;
        Supplier supplier;
        bool pending;
        bool isVerified;
        string processedBy;
        uint256 date;
    }

    struct Stock {
        string id;
        Supplier supplier;
        Payment payment;
        uint256 expenses;
        string description;
        StockProduct[] products;
        bool isVerified;
        string processedBy;
        uint256 date;
    }

    struct Payment {
        uint256 amountPaid;
        uint256 balance;
        PaymentStatus status;
        bool isVerified;
    }

    // Mappings
    mapping(string => Product) public products;
    mapping(string => Stock) public stocks;
    mapping(string => StockRequest) public stockRequests;

    // Events
    event ProductCreated(string id, string user);
    event ProductUpdated(string id, string user);
    event ProductDeleted(string id, address user);
    event StockCreated(string id, string user);
    event StockUpdated(string id, string user);
    event StockDeleted(string id, address user);
    event StockRequestCreated(string id, string user);
    event StockRequestUpdated(string id, string user);
    event StockRequestDeleted(string id, address user);
    event StockRequestVerified(string id, string user);
    event PaymentUpdated(string id, string user);
    event PaymentVerified(string id, string user);

    // Constructor to set up roles
    constructor(address admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(ADMIN_ROLE, admin);
        _grantRole(STOCK_KEEPER_ROLE, admin);
    }

    // Modifiers
    modifier onlyAdmin() {
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not an admin");
        _;
    }

    modifier adminOrStockKeeper() {
        require(
            hasRole(ADMIN_ROLE, msg.sender) ||
                hasRole(STOCK_KEEPER_ROLE, msg.sender),
            "Caller is not an admin or stock keeper"
        );
        _;
    }

    // Product Management
    function createProduct(
        string calldata id,
        string calldata name,
        uint256 price,
        uint256 qty,
        string calldata imageUrl,
        string calldata category,
        string calldata description,
        string calldata latestUpdateBy
    ) external onlyAdmin {
        require(bytes(products[id].id).length == 0, "Product already exists");

        products[id] = Product(
            id,
            name,
            price,
            qty,
            0,
            0,
            imageUrl,
            category,
            description,
            latestUpdateBy,
            block.timestamp
        );

        emit ProductCreated(id, latestUpdateBy);
    }

    function updateProduct(
        string calldata id,
        uint256 price,
        uint256 qty,
        string calldata description,
        string calldata latestUpdateBy
    ) external onlyAdmin {
        require(bytes(products[id].id).length != 0, "Product does not exist");

        Product storage product = products[id];
        product.price = price;
        product.qty = qty;
        product.description = description;
        product.latestUpdateBy = latestUpdateBy;
        product.latestUpdateDate = block.timestamp;

        emit ProductUpdated(id, latestUpdateBy);
    }

    function deleteProduct(string calldata id) external onlyAdmin {
        require(bytes(products[id].id).length != 0, "Product does not exist");

        delete products[id];
        emit ProductDeleted(id, msg.sender);
    }

    // Stock Management
    function createStock(
        string calldata id,
        Supplier calldata supplier,
        string calldata description,
        StockProduct[] memory stockProducts,
        uint256 expenses,
        string calldata processedBy
    ) external adminOrStockKeeper {
        require(bytes(stocks[id].id).length == 0, "Stock already exists");

        // Set initial stock data
        Stock storage stock = stocks[id];
        stock.id = id;
        stock.supplier = supplier;
        stock.expenses = expenses;
        stock.description = description;
        stock.isVerified = false;
        stock.processedBy = processedBy;
        stock.date = block.timestamp;

        // Initialize payment
        stock.payment = Payment(0, 0, PaymentStatus.None, true);

        // Add products and update inventory
        addStockProducts(id, stockProducts);

        emit StockCreated(id, processedBy);
    }

    function addStockProducts(
        string memory stockId,
        StockProduct[] memory stockProducts
    ) internal {
        Stock storage stock = stocks[stockId];

        for (uint256 i = 0; i < stockProducts.length; i++) {
            stock.products.push(stockProducts[i]);

            // Update product details
            string memory productId = stockProducts[i].id;
            require(
                bytes(products[productId].id).length != 0,
                "Product does not exist"
            );

            Product storage product = products[productId];
            product.price = stockProducts[i].price; // Update price
            product.incoming += stockProducts[i].qty; // Update incoming stock
        }
    }

    function verifyStock(
        string calldata id,
        string calldata processedBy
    ) external onlyAdmin {
        require(bytes(stocks[id].id).length != 0, "Stock does not exist");

        Stock storage stock = stocks[id];
        stock.isVerified = true;

        for (uint256 i = 0; i < stock.products.length; i++) {
            string memory productId = stock.products[i].id;
            require(
                bytes(products[productId].id).length != 0,
                "Product does not exist"
            );

            Product storage product = products[productId];
            product.incoming -= stock.products[i].qty;
            product.qty += stock.products[i].qty;
        }

        emit StockUpdated(id, processedBy);
    }

    function deleteStock(string calldata id) external onlyAdmin {
        require(bytes(stocks[id].id).length != 0, "Stock does not exist");

        delete stocks[id];
        emit StockDeleted(id, msg.sender);
    }

    // Stock Payment Management
    function updateStockPayment(
        string calldata id,
        uint256 amountPaid,
        string calldata processedBy
    ) external adminOrStockKeeper {
        require(bytes(stocks[id].id).length != 0, "Stock does not exist");

        Stock storage stock = stocks[id];
        stock.payment.amountPaid += amountPaid;

        uint256 totalPrice = calculateTotalStockPrice(stock.products);
        stock.payment.balance = totalPrice - stock.payment.amountPaid;
        stock.payment.status = (stock.payment.amountPaid >= totalPrice)
            ? PaymentStatus.FullPayment
            : PaymentStatus.PartPayment;

        emit PaymentUpdated(id, processedBy);
    }

    function verifyStockPayment(
        string calldata id,
        string calldata processedBy
    ) external adminOrStockKeeper {
        require(bytes(stocks[id].id).length != 0, "Stock does not exist");

        Stock storage stock = stocks[id];
        stock.payment.isVerified = true;

        emit PaymentVerified(id, processedBy);
    }

    // Stock Request Management
    function createStockRequest(
        string calldata id,
        StockProduct[] memory stockProducts,
        Supplier calldata supplier,
        string calldata processedBy
    ) external {
        require(
            bytes(stockRequests[id].id).length == 0,
            "Stock request already exists"
        );

        stockRequests[id].id = id;
        stockRequests[id].supplier = supplier;
        stockRequests[id].pending = true;
        stockRequests[id].isVerified = false;
        stockRequests[id].processedBy = processedBy;
        stockRequests[id].date = block.timestamp;

        for (uint256 i = 0; i < stockProducts.length; i++) {
            stockRequests[id].products.push(stockProducts[i]);
        }

        emit StockRequestCreated(id, processedBy);
    }

    function updateStockRequest(
        string calldata id,
        string calldata processedBy
    ) external adminOrStockKeeper {
        require(
            bytes(stockRequests[id].id).length != 0,
            "Stock request does not exist"
        );

        StockRequest storage stockRequest = stockRequests[id];
        stockRequest.pending = false;

        emit StockRequestUpdated(id, processedBy);
    }

    function verifyStockRequest(
        string calldata id,
        string calldata processedBy
    ) external onlyAdmin {
        require(
            bytes(stockRequests[id].id).length != 0,
            "Stock request does not exist"
        );

        StockRequest storage stockRequest = stockRequests[id];
        stockRequest.isVerified = true;

        emit StockRequestVerified(id, processedBy);
    }

    function deleteStockRequest(string calldata id) external onlyAdmin {
        require(
            bytes(stockRequests[id].id).length != 0,
            "Stock request does not exist"
        );
        delete stockRequests[id];
        emit StockRequestDeleted(id, msg.sender);
    }

    // Helper Functions
    function calculateTotalStockPrice(
        StockProduct[] memory stockProducts
    ) internal pure returns (uint256) {
        uint256 totalPrice = 0;
        for (uint256 i = 0; i < stockProducts.length; i++) {
            totalPrice += stockProducts[i].price * stockProducts[i].qty;
        }
        return totalPrice;
    }
}
