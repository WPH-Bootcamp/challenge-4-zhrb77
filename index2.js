const prompt = require("prompt-sync")({ sigint: true });

let todos = [];

function generateUniqueId() {
  // TODO: Implementasi fungsi untuk menghasilkan ID unik
  // Ini akan digunakan secara internal untuk setiap objek to-do
  // Contoh: Gabungan waktu saat ini dan angka acak
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 10000);
  return `${timestamp}-${randomNum}`;
}

function addTodo() {
  // TODO: Implementasi logika untuk menambah to-do baru
  // 1. Minta input teks to-do dari user menggunakan `prompt()`
  const text = prompt("Enter your to-do: ");
  
  // 2. Validasi input: Pastikan teks tidak kosong atau hanya spasi
  if (!text || text.trim() === "") {
    console.log("Error: To-do cannot be empty.");
    return;
  }
  
  // 3. Buat objek to-do baru dengan properti: id (dari generateUniqueId), text, dan isCompleted (boolean, default false)
  const newTodo = {
    id: generateUniqueId(),
    text: text.trim(),
    isCompleted: false
  };
  
  // 4. Tambahkan objek to-do ini ke array `todos`
  todos.push(newTodo);
  
  // 5. Beri feedback ke user bahwa to-do berhasil ditambahkan
  console.log(`To-do "${newTodo.text}" added successfully.`);
}

function markTodoCompleted() {
  // TODO: Implementasi logika untuk menandai to-do sebagai selesai
  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  listTodos();
  
  // Check if there are any todos
  if (todos.length === 0) {
    return;
  }
  
  // 2. Minta user memasukkan NOMOR to-do yang ingin ditandai sebagai selesai
  const input = prompt("Enter the NUMBER of the to-do to mark as completed: ");
  
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid (1 sampai jumlah to-do)
  const todoNumber = parseInt(input);
  
  if (isNaN(todoNumber)) {
    console.log("Error: Please enter a valid number.");
    return;
  }
  
  // Validate range (1 to todos.length)
  if (todoNumber < 1 || todoNumber > todos.length) {
    console.log(`Error: Please enter a number between 1 and ${todos.length}.`);
    return;
  }
  
  // Get the todo (subtract 1 for array index)
  const todo = todos[todoNumber - 1];
  
  // 4. Ubah properti `isCompleted` dari to-do yang dipilih menjadi `true`
  if (todo.isCompleted) {
    console.log(`To-do "${todo.text}" is already completed.`);
    return;
  }
  
  // 6. Tangani kasus jika to-do sudah selesai
  todo.isCompleted = true;
  
  // 5. Beri feedback ke user bahwa to-do berhasil ditandai selesai
  console.log(`To-do "${todo.text}" marked as completed.`);
}

function deleteTodo() {
  // TODO: Implementasi logika untuk menghapus to-do
    // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  listTodos();
  
  // Check if there are any todos
  if (todos.length === 0) {
    return;
  }
  
  // 2. Minta user memasukkan NOMOR to-do yang ingin dihapus
  const input = prompt("Enter the NUMBER of the to-do to delete: ");
  
  // 2. Minta user memasukkan NOMOR to-do yang ingin dihapus
  const todoNumber = parseInt(input);
  
  if (isNaN(todoNumber)) {
    console.log("Error: Please enter a valid number.");
    return;
  }
  
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid
  if (todoNumber < 1 || todoNumber > todos.length) {
    console.log(`Error: Please enter a number between 1 and ${todos.length}.`);
    return;
  }
  
  // Get the todo text before deletion for feedback
  const deletedTodo = todos[todoNumber - 1];
  
  // 4. Hapus to-do yang dipilih dari array `todos`
  todos.splice(todoNumber - 1, 1);
  
  // 5. Beri feedback ke user bahwa to-do berhasil dihapus
  console.log(`To-do "${deletedTodo.text}" deleted.`);
}

function listTodos() {
  // TODO: Implementasi logika untuk menampilkan semua to-do
    // 1. Tampilkan judul daftar (misal: "--- YOUR TO-DO LIST ---")
  console.log("\n--- YOUR TO-DO LIST ---");
  
  // 2. Cek apakah array `todos` kosong. Jika ya, tampilkan pesan "No to-dos to display."
  if (todos.length === 0) {
    console.log("No to-dos to display.");
    console.log("------------------------\n");
    return;
  }
  
  // 3. Jika tidak kosong, iterasi (loop) melalui array `todos`
  // 4. Untuk setiap to-do, tampilkan nomor urut, status ([DONE] atau [ACTIVE]), dan teks to-do
  //    Contoh format: "1. [ACTIVE] | Belajar JavaScript"
  todos.forEach((todo, index) => {
    const status = todo.isCompleted ? "[DONE]" : "[ACTIVE]";
    console.log(`${index + 1}. ${status} | ${todo.text}`);
  });
  
  // 5. Tampilkan garis penutup daftar
  console.log("------------------------\n");
}

function runTodoApp() {
  // TODO: Implementasi logika utama aplikasi (menu interaktif)
    // Ini adalah "otak" aplikasi yang terus berjalan sampai user memilih untuk keluar
  let running = true;
  
  console.log("\n=== Welcome to Your To-Do List App ===\n");
  
  while (running) {

    // 1. Tampilkan menu perintah yang tersedia (add, complete, delete, list, exit)
        // 2. Minta user memasukkan perintah menggunakan `prompt()`
    console.log("Commands:");
    console.log("  add      - Add a new to-do");
    console.log("  complete - Mark a to-do as completed");
    console.log("  delete   - Delete a to-do");
    console.log("  list     - Display all to-dos");
    console.log("  exit     - Exit the application");
    
    // Prompt for command
    const command = prompt("\nEnter a command: ");
    
    // Handle command
    if (!command) {
      console.log("Error: Please enter a command.\n");
      continue;
    }
    
    const normalizedCommand = command.trim().toLowerCase();
    
    // 3. Gunakan `switch` statement atau `if/else if` untuk memanggil fungsi yang sesuai
    //    berdasarkan perintah yang dimasukkan user
    // 4. Tangani perintah 'exit' untuk menghentikan loop aplikasi
    // 5. Tangani input perintah yang tidak valid
    switch (normalizedCommand) {
      case "add":
        addTodo();
        break;
      case "complete":
        markTodoCompleted();
        break;
      case "delete":
        deleteTodo();
        break;
      case "list":
        listTodos();
        break;
      case "exit":
        console.log("\nThank you for using the To-Do List App. Goodbye!");
        running = false;
        break;
      default:
        console.log(`Error: Unknown command "${command}". Please try again.\n`);
    }
  }
}

// Jangan ubah bagian di bawah ini. Ini adalah cara Node.js menjalankan fungsi utama
// dan mengekspor fungsi-fungsi untuk pengujian (jika nanti ada).
if (require.main === module) {
  runTodoApp();
}

module.exports = {
  todos,
  generateUniqueId,
  addTodo,
  markTodoCompleted,
  deleteTodo,
  listTodos,
  runTodoApp,
};