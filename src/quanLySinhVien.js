let students =JSON.parse(localStorage.getItem("students")) || [
    { name: "Nguyễn Văn Anh", class: "CNTT " },
    { name: "Trần Thị Bảo", class: "Kế toán " },
    { name: "Lê Minh Cường", class: "Quản trị Kinh doanh" },
    { name: "Phạm Hồng Duyên", class: "Ngôn ngữ Anh" }
];

function savedStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}


function renderStudents() {
    const list = document.getElementById("studentList");
    list.innerHTML= "";
    students.forEach((s, index) => {
        list.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${s.name}</td>
                <td>${s.class}</td>
                <td>
                    <button onclick="editStudent(${index})">Sửa</button>
                    <button onclick="deleteStudent(${index})">Xóa</button>
                </td>
            </tr>`;
    });

}

// Thêm hoặc Cập nhật sinh viên
function saveStudent() {
    const name = document.getElementById("fullname").value;
    const className = document.getElementById("class").value;
    const index = document.getElementById("studentIndex").value;

    if (!name || !className) return alert("Vui lòng nhập đủ thông tin!");

    if (index === "") {
        // Thêm mới
        students.push({ name: name, class: className });
    } else {
        // Cập nhật sinh viên cũ
        students[index] = { name: name, class: className };
        document.getElementById("studentIndex").value = "";
        document.getElementById("btnSave").innerText = "Thêm sinh viên";
    }

    document.getElementById("fullname").value = "";
    document.getElementById("class").value = "";

    savedStudents();
    renderStudents();
}

// Xóa sinh viên
function deleteStudent(index) {
    if (confirm("Bạn có chắc muốn xóa?")) {
        students.splice(index, 1);
        savedStudents();
        renderStudents();
    }
}

// Đổ dữ liệu vào form để sửa
function editStudent(index) {
    document.getElementById("fullname").value = students[index].name;
    document.getElementById("class").value = students[index].class;
    document.getElementById("studentIndex").value = index;
    document.getElementById("btnSave").innerText = "Cập nhật";
}

renderStudents(); // Hiển thị danh sách khi tải trang