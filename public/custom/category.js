$(document).ready(function () {
	$("#AddCategory").on("submit", function (e) {
		e.preventDefault();
		const data = $("#AddCategory").serialize()
		console.log("data",data);
		fetch("/insertCategoryData", {
			// Adding method type
			method: "POST",
			// Adding body or contents to send
			body: data,
			// Adding headers to the request
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
			// Converting to JSON
			.then(response => {response.json()
			console.log(response);
		})
			// Displaying results to console
			.then(json => console.log(json));
		// $.ajax({
		// 	url: "/insertCategoryData",
		// 	method: "POST",
		// 	data: $(this).serialize(), //new FormData(this),//$(this).serialize()
		// 	success: (response) => {
		// 		console.log(response);
		// 		$("#error").append(` <div class="alert alert-success" role="alert">
		//         ${response.message}
		//       </div> `);
		// 		setTimeout(() => {
		// 			$("#error").empty();
		// 			location.reload();
		// 		}, 3000);
		// 	},
		// 	error: (response) => {
		// 		console.log(response);
		// 		$("#error").append(` <div class="alert alert-danger" role="alert">
		//         ${response.responseJSON.message}
		//       </div> `);
		// 		setTimeout(() => {
		// 			$("#error").empty();
		// 		}, 3000);
		// 	},
		// });
	});
});
function editCategory(Id, categoryName) {
	$("#editModal").modal("show");
	$("#categoryIdEdit").val(Id);
	$("#categoryNameEdit").val(categoryName);
	$("#EditCategory").on("submit", function (e) {
		e.preventDefault();
		$.ajax({
			url: "/updateCategoryData" + Id,
			method: "POST",
			data: $(this).serialize(),
			success: (response) => {
				$("#editError").append(` <div class="alert alert-success" role="alert">
                ${response.message}
              </div> `);
				setTimeout(() => {
					$("#editError").empty();
					location.reload();
				}, 3000);
			},
			error: (response) => {
				$("#editError").append(` <div class="alert alert-danger" role="alert">
                ${response.responseJSON.message}
              </div> `);
				setTimeout(() => {
					$("#editError").empty();
				}, 3000);
			},
		});
	});
}
function deleteCategory(Id) {
	$.ajax({
		url: "/deleteCategoryData" + Id,
		method: "POST",
		success: (response) => {
			alert(response.message);
			location.reload();
		},
	});
}
var path = document.location.pathname.split("/");
var page = !path[2] ? 1 : path[2];
var size = 10;

async function paginationNext() {
	page++;

	$("#page-item").text(page);
	$(location).attr("href", `/category/${page}/${size}`);
}
function paginationPrevious() {
	if (page > 1) {
		page--;
	}

	$("#page-item").text(page);
	$(location).attr("href", `/category/${page}/${size}`);
}

window.onload = function () {
	$("#page-item").text(page);
	$(".changePage").text(page);
};
