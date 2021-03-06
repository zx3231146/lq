layui.use('layer',function(){
	layer=layui.layer;
});

$(function(){
	//搜索条件
	var mainSearchData=[{
		idName:'combo30',
		text:'工厂',
		comboUrl:'/base/plant/publicPlantSelect',
		comboId:'tmBasPlantId',
		comboText:'plant',
		valid:['notEmpty'],
		field:'tmBasPlantId',
		onClick:function(data){
			Ew.selectLink({
		        comboUrl:'/base/workshop/publicWorkshopSelect',
		        comboData:JSON.stringify({tmBasPlantId:data.id}),
		        id:['combo31'],
		        comboId:'tmBasWorkshopId',
		        comboText:'workshop'
		    });
      Ew.selectLink({
        comboUrl:'/base/line/publicLineSelect',
        comboData:JSON.stringify({tmBasPlantId:data.id}),
        id:['combo32'],
        comboId:'tmBasLineId',
        comboText:'line'
      });
		}
	},{
		idName:'combo31',
		text:'车间',
		comboUrl:'/base/workshop/publicWorkshopSelect',
		comboId:'tmBasWorkshopId',
		comboText:'workshop',
		field:'tmBasWorkshopId',
		onClick:function(data){
			Ew.selectLink({
		        comboUrl:'/base/line/publicLineSelect',
		        comboData:JSON.stringify({tmBasWorkshopId:data.id}),
		        id:['combo53'],
		        comboId:'tmBasLineId',
		        comboText:'line'
		    });
		}
	},{
		idName:'combo32',
		text:'产线',
		comboUrl:'/base/line/publicLineSelect',
		comboId:'tmBasLineId',
		comboText:'line',
		field:'tmBasLineId'
	},{
		idName:'combo33',
		text:'工位',
		valid:['notEmpty'],
		comboUrl:'/base/uloc/queryUlocSelectList',
		comboData:{
			id:['combo30','combo31','combo32'],
			field:['pTmBasPlantId','wTmBasWorkshopId','lTmBasLineId'],
			other:{}
		},
		comboId:'ulocNo',
		comboText:'ulocNo',
		field:'ulocNo',
		isSearch:true		
	}]

	Ew.search('.searchForm',{
		title:'查询',
		textValues:mainSearchData,
		btnValues:[{
			btnId:'btnSearch',
			text:'搜索',
			onClick:function(data){
				$('#tableMmAndon').bootstrapTable('refreshOptions',{pageNumber:1});
			}
		},{
			btnId:'btnClear',
			text:'重置',
			tableid:['tableMmAndon']
		}]
	});

	//主表格
	Ew.getDictVal([], function (re) {
		Ew.table('.mainTable',{
			btnValues:[{
				btnId:'BtnAdd',text:'取消',onClick:function(){
					daliogShow('change');
				}
			},{
				btnId:'BtnEdit',text:'呼叫',otherOption:[{id:'tableMmAndon',selectNum: 1}],onClick:function(){
					daliogShow2('change');
				}
			}/*,{
				btnId:'BtnDelete',text:'删除',isTrue:true,otherOption:[{id:'tableMmAndon',selMinNum: 1}],onClick:function(){
					var rows = $('#tableMmAndon').bootstrapTable('getSelections');
					ids = [];
					var flag = true;
					$.each(rows,function(index,row){
						ids.push(row.tmMmAndonId);
					});
					datas = JSON.stringify(ids);
					var url = '/andon/mmAndon/delete'
					$.when(Ew.ewAjax(url,datas)).done(function(results){
						$('#tableMmAndon').bootstrapTable('refresh');
					});
				}
			},{
					btnId:'BtnDownload',text:'模板下载',isTrue:true,selMinNum:1,onClick:function(){
					var  url = '/andon/mmAndon/downLoad';
	           		window.top.location.href = Ew.apiUrl +url;
				}
				
			},{
				btnId:'btnImport',text:'导入',selMinNum:1,url:'/andon/mmAndonCall/andonCall',tableId:'tableMmAndon'
			},{
				btnId:'BtnExport',text:'导出',onClick:function(){
					var tmBasPlantId = $('#comboFactory').val();
					var uloc = $('#comboUloc').val();
					var uloc2 = $('#comboUloc2').val();
					var partgroup = $('#combogroupPart').val();
					var part = $('#comboPart').val();
					var andonNo = $('#combo234').val();
					var enable = $('#combo_part_enabled').val();
					
					window.top.location.href= apiUrl +'/andon/mmAndon/export?tmBasPlantId='+tmBasPlantId+'&uloc='+uloc+'&uloc2='+uloc2+'&partgroup='+partgroup+'&part='+part+'&andonNo='+andonNo+'&enable='+enable;
				}
			}*/],
			tableId:'tableMmAndon',
			tableValue:{
				searchParams:mainSearchData,
				queryParams:function(){
					return{}
				},
				onClickRow:function(item,$element){
	
				},
				onLoadSuccess:function(){
					$('.sw').bootstrapSwitch({
						onText:"启用",
						offText:"禁用",
						onColor:"success",
						offColor:"info",
						onSwitchChange:function(event,state){
							var d = {};
							d.tmMmAndonId = $(this).attr('fieldValue');
							d.enabled = state?1:0;
							datas = JSON.stringify(d);
							var url = "/andon/mmAndon/update";
							$.when(Ew.ewAjax(url,datas)).done(function(results){
								$('#tableMmAndon').bootstrapTable('refresh');
				            });
						}
					});
				},
				url:'/andon/mmAndonCall/querylistByPage',
				columns:[{
					checkbox: true
				},{
					field: 'plant',
					title: '工厂',
					align: 'center',
					sortable:true
				},{
					field: 'workshop',
					title: '车间',
					align: 'center',
					sortable:true
				},{
					field: 'line',
					title: '产线',
					align: 'center',
					sortable:true
				},{
					field: 'uloc',
					title: '使用工位',
					align: 'center',
					sortable:true
				},{
					field: 'andonStatus',
					title: '暗灯状态',
					align: 'center',
					sortable:true
				},{
					field: 'tmMmAndonNo',
					title: '暗灯号',
					align: 'center',
					sortable:true
				},{
					field: 'andonSeq',
					title: '顺序',
					align: 'center',
					sortable:true
				},{
					field: 'partgroup',
					title: '组合零件',
					align: 'center',
					sortable:true
				},{
					field: 'part',
					title: '零件',
					align: 'center',
					sortable:true
				},{
					field: 'thumbQty',
					title: '拇指数量',
					align: 'center',
					sortable:true
				},{
					field: 'lotQty',
					title: '拉动批量',
					align: 'center',
					sortable:true
				},{
					field: 'packageQty',
					title: '包装数量',
					align: 'center',
					sortable:true
				},{
					field: 'area',
					title: '送货区域',
					align: 'center',
					sortable:true
				},{
					field: 'role',
					title: '送货组',
					align: 'center',
					sortable:true
				},{
					field: 'user',
					title: '送货人员',
					align: 'center',
					sortable:true
				},{
					field: 'responseTime',
					title: '送货响应时间（分）',
					align: 'center',
					sortable:true
				},{
					field: 'arriveTime',
					title: '送货到达时间（分）',
					align: 'center',
					sortable:true
				},{
					field:'enabled',
					title:'启用',
					align:'center',
	        		width:'120px',
					formatter: function (value, row, index) {
		              return Ew.switchHl(value,'sw',row.tmMmAndonId)
		            }
				}]
			}
		});
	})	
})

function daliogShow(type){
	var title=type=='add'?'新增':'编辑';
	var defaultTable=type=='add'?'':'tableMmAndon';
	Ew.dialog('mainFromEdit',{
		title:title,
		btnValues:[{
			btnId:'btnSave',
			text:'保存',
			formid:'form',
			onClick:function(data){
				if(type=='change'){
					data = $('#'+defaultTable).bootstrapTable('getSelections')[0];
				}
				datas = JSON.stringify(data);
				var url = (type=='add'?'/andon/mmAndonCall/andonCancel':'/andon/mmAndonCall/andonCancel');
				$.when(Ew.ewAjax(url,datas)).done(function(results){
					$('#mainFromEdit').modal('hide');
					$('#tableMmAndon').bootstrapTable('refresh');
				});
			}
		},{
			btnId:'btnCancel',
			text:'取消'
		}],
		form:{
			formId:'form',
			columnNum:3,
			listWidth:300,
			formList:[
			{
				idName:'combo11',
				text:'工厂',
				comboUrl:'/base/plant/publicPlantSelect',
				comboId:'tmBasPlantId',
				comboText:'plant',
				field:'tmBasPlantId',
				valid:['notEmpty'],
				/*disabled:type=='add'?false:true,*/
				comboData:type=='add'?JSON.stringify({
					enabled:1
				}):{},
				onClick:function(data){
					Ew.selectLink({
				        comboUrl:'/base/workshop/publicWorkshopSelect',
				        comboData:JSON.stringify({tmBasPlantId:data.id,enabled:1}),
				        id:['combo12'],
				        comboId:'tmBasWorkshopId',
				        comboText:'workshop'
				    });
						Ew.selectLink({
									comboUrl:'/base/line/publicLineSelect',
									comboData:JSON.stringify({tmBasPlantId:data.id,enabled:1}),
									id:['combo13'],
									comboId:'tmBasLineId',
									comboText:'line'
							});

						  $('#combo18').select2('val',['']);
	            $('#combo19').select2('val',['']);
				}
			},{
				idName:'combo12',
				text:'车间',
				comboUrl:'/base/workshop/publicWorkshopSelect',
				comboId:'tmBasWorkshopId',
				comboText:'workshop',
				field:'tmBasWorkshopId',
				comboData:type=='add'?JSON.stringify({
					enabled:1
				}):JSON.stringify({
					enabled:1,
					tmBasPlantId:$('#tableMmAndon').bootstrapTable('getSelections')[0].tmBasPlantId
				}),
				onClick:function(data){
					Ew.selectLink({
				        comboUrl:'/base/line/publicLineSelect',
				        comboData:JSON.stringify({tmBasWorkshopId:data.id,enabled:1}),
				        id:['combo13'],
				        comboId:'tmBasLineId',
				        comboText:'line'
				    });
				}
			},{
				idName:'combo13',
				text:'产线',
				comboUrl:'/base/line/publicLineSelect',
				comboId:'tmBasLineId',
				comboText:'line',
				field:'tmBasLineId',
 				comboData:type=='add'?JSON.stringify({
					enabled:1
				}):JSON.stringify({
					enabled:1,
					tmBasPlantId:$('#tableMmAndon').bootstrapTable('getSelections')[0].tmBasPlantId,
					tmBasWorkshopId:$('#tableMmAndon').bootstrapTable('getSelections')[0].tmBasWorkshopId
				})
			},{
				idName:'combo14',
				text:'使用工位',
				field:'tmBasUlocId',
				comboUrl:'/base/uloc/queryUlocSelectList',
				comboId:'tmBasUlocId',
				comboText:'uloc',
				comboData:{
					id:['combo11'],
					field:['pTmBasPlantId']
				},
				clearBoth:true,
				valid:['notEmpty',{type:"string",min:0,max:32}],
				/*disabled:type=='add'?false:true,*/
				isSearch:true
			},{
				idName:'combo15',
				text:'投料工位',
				field:'tmBasUlocId2',
				comboUrl:'/base/uloc/queryUlocSelectList',
				comboId:'tmBasUlocId',
				comboText:'uloc',
				comboData:{
					id:['combo11'],
					field:['pTmBasPlantId']
				},
				valid:['notEmpty',{type:"string",min:0,max:32}],
				isSearch:true
			},{
				idName:'textTmMmAndonNo',
				text:'暗灯号',
				field:'tmMmAndonNo',
				valid:['notEmpty']
			},{
				idName:'textandonSeq',
				text:'顺序',
				field:'andonSeq',
			},{
				idName:'combopartType',
				text:'物料属性',
				field:'partType',
				comboUrl:'/system/codeList/getSelect',
				comboData:'ANDON_PART_TYPE',
				comboId:'no',
				comboText:'name',
				onClick:function(data){
					$('#combo18').html('');
					$('#combo19').html('');
					if(data.id == 'P'){
						$("#combo19").prop('disabled',false);
						$("#combo18").prop('disabled',true);
					}else if(data.id == 'G'){
						$("#combo18").prop('disabled',false);
						$("#combo19").prop('disabled',true);
					}else{
						$("#combo18").prop('disabled',true);
						$("#combo19").prop('disabled',true);
					}
				}
			},{
				idName:'combo18',
				text:'组合物料',
				field:'tmBasPartgroupId',
				comboUrl:'/worktime/part/queryPartGroupSuggest',
				comboId:'tmBasPartgroupId',
				comboText:'partgroup',
				disabled:true,
				isSearch:true,
				comboData:{
					id:['combo11'],
					field:['tmBasPlantId']
				}
			},{
				idName:'combo19',
				text:'物料',
				field:'tmBasPartId',
				comboUrl:'/worktime/part/queryPartPartGroupSuggest',
				comboId:'tmBasPartId',
				comboText:'part',
				disabled:true,
				comboData:{
					id:['combo11'],
					field:['tmBasPlantId']
				},
				isSearch:true
			},{
				idName:'numberThumbQty',
				text:'拇指数',
				field:'thumbQty',
				valid:['notEmpty']
			},{
				idName:'numberLotQty',
				text:'拉动批量',
				field:'lotQty',
				valid:['notEmpty']
			},{
				idName:'textArea',
				text:'送货区域',
				field:'area',
			},{
				idName:'comboSend',
				text:'送货组',
				comboUrl:'/system/role/queryRoles',
				comboId:'tsSysRoleId',
				comboText:'role',
				field:'sendgroup',
				isSearch:true
			},{
				idName:'combo445',
				text:'送货人员',
				field:'sendBy',
				comboUrl:'/system/user/queryUsers',
				comboId:'tsSysUserId',
				comboText:'user',
				isSearch:true
				
			},{
				idName:'number219',
				text:'送料相应时间（分）',
				field:'responseTime',
				valid:['notEmpty']
			},{
				idName:'number218',
				text:'送料到达时间（分）',
				field:'arriveTime',
				valid:['notEmpty']
			},{
				idName:'switch11',
				text:'启用',
				field:'enabled',
				ontext:'启用',
				offtext:'禁用'
			},{
	        	idName:'text311',
				text:'版本号',
				field:'version',
				hidden:true
			}],
			defaultTable:defaultTable
		}
	})
}






function daliogShow2(type){
	var title=type=='add'?'新增':'编辑';
	var defaultTable=type=='add'?'':'tableMmAndon';
	Ew.dialog('mainFromEdit',{
		title:title,
		btnValues:[{
			btnId:'btnSave',
			text:'保存',
			formid:'form',
			onClick:function(data){
				if(type=='change'){
					data = $('#'+defaultTable).bootstrapTable('getSelections')[0];
				}
				datas = JSON.stringify(data);
				var url = (type=='add'?'/andon/mmAndonCall/andonCancel':'/andon/mmAndonCall/andonCall');
				$.when(Ew.ewAjax(url,datas)).done(function(results){
					$('#mainFromEdit').modal('hide');
					$('#tableMmAndon').bootstrapTable('refresh');
				});
			}
		},{
			btnId:'btnCancel',
			text:'取消'
		}],
		form:{
			formId:'form',
			columnNum:3,
			listWidth:300,
			formList:[
			{
				idName:'combo11',
				text:'工厂',
				comboUrl:'/base/plant/publicPlantSelect',
				comboId:'tmBasPlantId',
				comboText:'plant',
				field:'tmBasPlantId',
				valid:['notEmpty'],
				/*disabled:type=='add'?false:true,*/
				comboData:type=='add'?JSON.stringify({
					enabled:1
				}):{},
				onClick:function(data){
					Ew.selectLink({
				        comboUrl:'/base/workshop/publicWorkshopSelect',
				        comboData:JSON.stringify({tmBasPlantId:data.id,enabled:1}),
				        id:['combo12'],
				        comboId:'tmBasWorkshopId',
				        comboText:'workshop'
				    });
						Ew.selectLink({
									comboUrl:'/base/line/publicLineSelect',
									comboData:JSON.stringify({tmBasPlantId:data.id,enabled:1}),
									id:['combo13'],
									comboId:'tmBasLineId',
									comboText:'line'
							});

						  $('#combo18').select2('val',['']);
	            $('#combo19').select2('val',['']);
				}
			},{
				idName:'combo12',
				text:'车间',
				comboUrl:'/base/workshop/publicWorkshopSelect',
				comboId:'tmBasWorkshopId',
				comboText:'workshop',
				field:'tmBasWorkshopId',
				comboData:type=='add'?JSON.stringify({
					enabled:1
				}):JSON.stringify({
					enabled:1,
					tmBasPlantId:$('#tableMmAndon').bootstrapTable('getSelections')[0].tmBasPlantId
				}),
				onClick:function(data){
					Ew.selectLink({
				        comboUrl:'/base/line/publicLineSelect',
				        comboData:JSON.stringify({tmBasWorkshopId:data.id,enabled:1}),
				        id:['combo13'],
				        comboId:'tmBasLineId',
				        comboText:'line'
				    });
				}
			},{
				idName:'combo13',
				text:'产线',
				comboUrl:'/base/line/publicLineSelect',
				comboId:'tmBasLineId',
				comboText:'line',
				field:'tmBasLineId',
 				comboData:type=='add'?JSON.stringify({
					enabled:1
				}):JSON.stringify({
					enabled:1,
					tmBasPlantId:$('#tableMmAndon').bootstrapTable('getSelections')[0].tmBasPlantId,
					tmBasWorkshopId:$('#tableMmAndon').bootstrapTable('getSelections')[0].tmBasWorkshopId
				})
			},{
				idName:'combo14',
				text:'使用工位',
				field:'tmBasUlocId',
				comboUrl:'/base/uloc/queryUlocSelectList',
				comboId:'tmBasUlocId',
				comboText:'uloc',
				comboData:{
					id:['combo11'],
					field:['pTmBasPlantId']
				},
				clearBoth:true,
				valid:['notEmpty',{type:"string",min:0,max:32}],
				/*disabled:type=='add'?false:true,*/
				isSearch:true
			},{
				idName:'combo15',
				text:'投料工位',
				field:'tmBasUlocId2',
				comboUrl:'/base/uloc/queryUlocSelectList',
				comboId:'tmBasUlocId',
				comboText:'uloc',
				comboData:{
					id:['combo11'],
					field:['pTmBasPlantId']
				},
				valid:['notEmpty',{type:"string",min:0,max:32}],
				isSearch:true
			},{
				idName:'textTmMmAndonNo',
				text:'暗灯号',
				field:'tmMmAndonNo',
				valid:['notEmpty']
			},{
				idName:'textandonSeq',
				text:'顺序',
				field:'andonSeq',
			},{
				idName:'combopartType',
				text:'物料属性',
				field:'partType',
				comboUrl:'/system/codeList/getSelect',
				comboData:'ANDON_PART_TYPE',
				comboId:'no',
				comboText:'name',
				onClick:function(data){
					$('#combo18').html('');
					$('#combo19').html('');
					if(data.id == 'P'){
						$("#combo19").prop('disabled',false);
						$("#combo18").prop('disabled',true);
					}else if(data.id == 'G'){
						$("#combo18").prop('disabled',false);
						$("#combo19").prop('disabled',true);
					}else{
						$("#combo18").prop('disabled',true);
						$("#combo19").prop('disabled',true);
					}
				}
			},{
				idName:'combo18',
				text:'组合物料',
				field:'tmBasPartgroupId',
				comboUrl:'/worktime/part/queryPartGroupSuggest',
				comboId:'tmBasPartgroupId',
				comboText:'partgroup',
				disabled:true,
				isSearch:true,
				comboData:{
					id:['combo11'],
					field:['tmBasPlantId']
				}
			},{
				idName:'combo19',
				text:'物料',
				field:'tmBasPartId',
				comboUrl:'/worktime/part/queryPartPartGroupSuggest',
				comboId:'tmBasPartId',
				comboText:'part',
				disabled:true,
				comboData:{
					id:['combo11'],
					field:['tmBasPlantId']
				},
				isSearch:true
			},{
				idName:'numberThumbQty',
				text:'拇指数',
				field:'thumbQty',
				valid:['notEmpty']
			},{
				idName:'numberLotQty',
				text:'拉动批量',
				field:'lotQty',
				valid:['notEmpty']
			},{
				idName:'textArea',
				text:'送货区域',
				field:'area',
			},{
				idName:'comboSend',
				text:'送货组',
				comboUrl:'/system/role/queryRoles',
				comboId:'tsSysRoleId',
				comboText:'role',
				field:'sendgroup',
				isSearch:true
			},{
				idName:'combo445',
				text:'送货人员',
				field:'sendBy',
				comboUrl:'/system/user/queryUsers',
				comboId:'tsSysUserId',
				comboText:'user',
				isSearch:true
				
			},{
				idName:'number219',
				text:'送料相应时间（分）',
				field:'responseTime',
				valid:['notEmpty']
			},{
				idName:'number218',
				text:'送料到达时间（分）',
				field:'arriveTime',
				valid:['notEmpty']
			},{
				idName:'switch11',
				text:'启用',
				field:'enabled',
				ontext:'启用',
				offtext:'禁用'
			},{
	        	idName:'text311',
				text:'版本号',
				field:'version',
				hidden:true
			}],
			defaultTable:defaultTable
		}
	})
}
