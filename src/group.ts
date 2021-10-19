((_) => {
	_.init();
	$(_.onLoad);
})((() => {
	let idx = 0;
	function initText() {
		$("#addGroupName").val("");
		$("#modifyGroupName").val("");
		$("#isActive").prop("checked", "");
		$(".add-group-board").hide();
		$(".modify-group-board").hide();
	}
	return {
		init: () => {

		},
		onLoad: () => {
			let table = $('#groupList').DataTable({
				ajax: {
					url: 'setting/grouplist.json',
					type: "POST",
					dataSrc: ''
				},
				columns: [{
					data: 'name'
				}, {
					data: 'state'
				}],
				lengthMenu: [5],
				lengthChange: false,
				//bInfo : false
			});
			type GroupItem = {
				name: string,
				active: boolean,
				idx: number
			}
			$("#groupList tbody").on('click', 'tr', function () {
				let data = <GroupItem>table.row(this).data();
				initText();
				$("#modifyGroupName").val(data.name);
				if (data.active) {
					$("#isActive").prop("checked", "checked");
				}
				idx = data.idx;
				$(".modify-group-board").show();
			});
			$("#addGroup").on('click', () => {
				initText();
				$(".add-group-board").show();
			});
			$("#addGroupTeamSave").on("click", () => {
				let name = $("#addGroupName").val();
				if (name === undefined || $.trim(name.toString()) === "") {
					message.error("Please input Group name.");
					return;
				}
				loader.on();
				$.ajax({
					type: "POST",
					url: "setting/addGroupName.json",
					dataType: 'json',
					data: {
						name: name
					},
					success: (data) => {
						if (data.success) {
							initText();
							table.ajax.reload();
							message.success(data.message);
						} else {
							message.error(data.message);
						}
					},
					error: (data, e) => {
						message.error(e);
					},
					complete: () => {
						loader.off();
					}
				});
			});
			$("#modifyGroupTeamSave").on("click", () => {
				let name = $("#modifyGroupName").val();
				if (idx <= 0 || name === undefined || $.trim(name.toString()) === "") {
					message.error("Please input Group name.");
					return;
				}
				loader.on();
				$.ajax({
					type: "POST",
					url: "setting/modifyGroupName.json",
					dataType: 'json',
					data: {
						idx: idx,
						name: name,
						active: $("#isActive").prop("checked")
					},
					success: (data) => {
						if (data.success) {
							initText();
							table.ajax.reload();
							message.success(data.message);
						} else {
							message.error(data.message);
						}
					},
					error: (data, e) => {
						message.error(e);
					},
					complete: () => {
						loader.off();
					}
				});
			});
		}
	}
})());