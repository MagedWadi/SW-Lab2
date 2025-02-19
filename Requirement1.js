const inventory = [];
const transactions = [];
const categories = [];
const customFields = {};

// Adds a new item to the inventory
function addItem(name, category, quantity, price, unit, customFields = {}) {
  const item = {
    name,
    category,
    quantity,
    price,
    unit,
    added: new Date(),
    customFields,
  };
  inventory.push(item);
  if (!categories.includes(category)) categories.push(category);
  transactions.push({ type: "add", item });
}

// Edits an existing item in the inventory
function editItem(index, updatedItem) {
  if (inventory[index]) {
    transactions.push({
      type: "edit",
      old: inventory[index],
      new: updatedItem,
    });
    inventory[index] = { ...inventory[index], ...updatedItem };
  }
}

// Removes an item from the inventory and logs an alert
function removeItem(index) {
  if (inventory[index]) {
    console.log(
      `**ALERT: Item ${inventory[index].name} is being removed from inventory!**`
    );
    transactions.push({ type: "delete", item: inventory[index] });
    inventory.splice(index, 1);
  }
}

// Processes a sale, updates item quantity, and logs an alert if quantity falls below 10
function processSale(itemName, quantitySold) {
  inventory.filter((item) => {
    if (item.quantity >= quantitySold) {
      item.quantity -= quantitySold;
      transactions.push({
        type: "sale",
        item,
        quantitySold,
        date: new Date(),
      });
      console.log(`Sold ${quantitySold} ${item.unit} of ${item.name}`);

      if (item.quantity < 10) {
        console.log(
          `**ALERT: Item ${item.name} is below 10 units! Current quantity: ${item.quantity}**`
        );
      }
      if (item.quantity <= 0) {
        removeItem(inventory.indexOf(item));
      }
    }
  });
}

// Restocks an item in the inventory
function restockItem(itemName, quantityRestocked) {
  for (let item of inventory) {
    if (item.name === itemName) {
      item.quantity += quantityRestocked;
      transactions.push({
        type: "restock",
        item,
        quantityRestocked,
        date: new Date(),
      });
      console.log(
        `Restocked ${quantityRestocked} ${item.unit} of ${item.name}`
      );
      break;
    }
  }
}

// Searches for items in the inventory
function searchItem(query) {
  console.log(
    inventory
      .filter((item) =>
        [item.name, item.category, item.price].some((value) =>
          value.toString().toLowerCase().includes(query.toLowerCase())
        )
      )
      .map(
        (item) =>
          `${item.name} (${item.category}) - ${item.quantity} ${item.unit} @ $${item.price}`
      )
      .join("\n")
  );
}

// Displays all items in the inventory
function viewInventory() {
  console.log("=== Inventory ===");
  console.log(
    inventory
      .map(
        (item) =>
          `${item.name} (${item.category}) - ${item.quantity} ${item.unit} @ $${item.price}`
      )
      .join("\n")
  );
}

// Displays all transactions
function viewAllTransactions() {
  console.log("Transactions:");
  console.log(
    transactions
      .map((transaction) => `${transaction.type} - ${transaction.item.name}`)
      .join("\n")
  );
}

// Imports multiple items into the inventory
function importItems(items) {
  items.forEach((item) =>
    addItem(item.name, item.category, item.quantity, item.price, item.unit)
  );
}

// Adds a new custom field
function addCustomField(fieldName) {
  if (!customFields[fieldName]) customFields[fieldName] = null;
}

// Updates a custom field for a specific item
function updateCustomField(itemName, fieldName, value) {
  const item = inventory.find((item) => item.name === itemName);
  if (item) item.customFields[fieldName] = value;
}

// Main function to run test cases
function main() {
  console.log("Running inventory tests...");

  addItem("Apple", "Fruit", 10, 1.5, "kg");
  addItem("Banana", "Fruit", 5, 1, "kg");
  addItem("Orange", "Fruit", 3, 2, "kg");
  addItem("Milk", "Dairy", 5, 3, "litre");
    viewInventory();
  processSale("Apple", 2);
  processSale("Banana", 5);
  restockItem("Milk", 2);

  searchItem("mil");
  viewInventory();

  importItems([
    {
      name: "Pineapple",
      category: "Fruit",
      quantity: 11,
      price: 3,
      unit: "kg",
    },
  ]);

  addCustomField("Origin");
  updateCustomField("Apple", "Origin", "India");
  processSale("Pineapple", 2);
  removeItem(2);
  viewInventory();
  viewAllTransactions();
}

main();
