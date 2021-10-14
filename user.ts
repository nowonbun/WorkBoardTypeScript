((_) => {
	_.init();
	$(_.onLoad);
})((() => {
	function initText() {
		$(".add-user-board").hide();
		$(".modify-user-board").hide();
	}
	return {
		init: () => {

		},
		onLoad: () => {
			let table = $('#userList').DataTable({
				ajax: {
					url: 'setting/userlist.json',
					type: "POST",
					dataSrc: ''
				},
				columns: [{
					data: 'id'
				}, {
					data: 'name'
				}, {
					data: 'state'
				}, {
					data: 'isAdmin'
				}],
				lengthMenu: [5],
				lengthChange: false,
				//bInfo : false
			});
			$("#userList tbody").on('click', 'tr', function () {
				let data = table.row(this).data();
				console.log(data);
			});
			$("#addUser").on('click', () => {
				initText();
				$(".add-user-board").show();
				$("#group").select2();
			});
		}
	}
})());