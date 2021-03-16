sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("exportOrder.ExportOrderFulfillment.controller.ExportOrder", {
		onInit: function (oEvent) {
			sap.ui.core.BusyIndicator.show();
			this.getView().byId("saleOrderGrp").setVisible(false);
			this.getView().byId("materialGrp").setVisible(false);
			var that = this;
			var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Z_SCMEXPORDFUL_CDS/");
			oModel.read("/Z_SCMEXPORDFUL", {
				success: function (data, response) {
					var oResults = data.results;
					for (var i = 0; i < oResults.length; i++) {
						exportArray.push({
							customer: oResults[i].Customer,
							customerDesc: oResults[i].CustomerDesc,
							plant: oResults[i].Plant,
							plantDesc: oResults[i].PlantDesc,
							orderQty: Number(oResults[i].OrderQty),
							invoiceQty: Number(oResults[i].InvoiceQty),
							materialNumber: oResults[i].MaterialNumber,
							materialDesc: oResults[i].MaterialDesc,
							balanceQty: Number(oResults[i].BalanceQty),
							unit: oResults[i].Unit
						});
					}

					var plant = exportArray[0].plant;
					var customer = exportArray[0].customer;
					var plantComboData = [];
					var warehouseData = [];
					var warehouseData1 = [];
					for (var m = 0; m < exportArray.length; m++) {
						if (warehouseData.indexOf(exportArray[m].plant) === -1) {
							warehouseData.push(exportArray[m].plant);
							warehouseData1.push(exportArray[m].plantDesc);
						}
					}
					for (var n = 0; n < warehouseData.length; n++) {
						var object = {};
						object.plantDataCom = warehouseData[n];
						object.plantDescData = warehouseData1[n];
						object.key = n;
						plantComboData.push(object);
					}
					var plantComboModel = new sap.ui.model.json.JSONModel();
					plantComboModel.setData(plantComboData);
					plantComboModel.setSizeLimit(500);
					that.getView().setModel(plantComboModel, "plant");
					that.getView().byId("plant").setSelectedKey(0);

					var custComboData = [];
					var custData = [];
					var custData1 = [];
					for (var m = 0; m < exportArray.length; m++) {
						if (custData.indexOf(exportArray[m].customer) === -1 &&
							custData1.indexOf(exportArray[m].customerDesc) === -1 &&
							exportArray[m].plant == plant) {
							custData.push(exportArray[m].customer);
							custData1.push(exportArray[m].customerDesc);
						}
					}
					for (var n = 0; n < custData.length; n++) {
						var object = {};
						object.custDataCom = custData[n];
						object.custDescData = custData1[n];
						object.key = n;
						custComboData.push(object);
					}
					var custComboModel = new sap.ui.model.json.JSONModel();
					custComboModel.setData(custComboData);
					custComboModel.setSizeLimit(500);
					that.getView().setModel(custComboModel, "customer");

					that.getView().byId("customer").setSelectedKey(0);
					var vizArray = [];
					for (var z = 0; z < exportArray.length; z++) {
						if (exportArray[z].plant === plant && exportArray[z].customer == customer) {
							vizArray.push({
								plant: exportArray[z].plant,
								customer: exportArray[z].customer,
								plantDesc: exportArray[z].plantDesc,
								customerDesc: exportArray[z].customerDesc,
								materialNumber: exportArray[z].materialNumber,
								materialDesc: exportArray[z].materialDesc,
								orderQty: exportArray[z].orderQty,
								invoiceQty: exportArray[z].invoiceQty,
								balanceQty: exportArray[z].balanceQty,
								unit: exportArray[z].unit
							});
						}
					}

					var vizModel = new sap.ui.model.json.JSONModel();
					vizModel.setData(vizArray);
					that.getView().setModel(vizModel, "orderVizframe");
					var orderVizframe = that.getView().byId("orderVizframe");
					orderVizframe.setVizProperties({
						"interaction": {
							"noninteractiveMode": false,
							"selectability": {
								"legendSelection": false,
								"axisLabelSelection": false,
								"mode": "EXCLUSIVE",
								"plotLassoSelection": false,
								"plotStdSelection": true
							}
						},
						tooltip: {
							visible: true
						},
						plotArea: {
							line: {
								marker: {
									visible: false
								}
							},
							gridline: {
								visible: true
							},
							dataPointSize: {
								min: 20,
								max: 30
							},
							dataPointStyle: {
								'rules': [{
									"dataContext": {
										"BalanceQuantity": {
											min: 0,
											max: 20
										}
									},
									"properties": {
										"color": "#0da2c0",
										"dataLabel": {
											"visible": true
										}
									}
								}, {
									"dataContext": {
										"BalanceQuantity": {
											min: 21,
											max: 40
										}
									},
									"properties": {
										"color": "#0d7ec0",
										"dataLabel": {
											"visible": true
										}
									}
								}, {
									"dataContext": {
										"BalanceQuantity": {
											min: 41,
											max: 60
										}
									},
									"properties": {
										"color": "#0d5bc0",
										"dataLabel": {
											"visible": true
										}
									}
								}, {
									"dataContext": {
										"BalanceQuantity": {
											min: 61,
											max: 80
										}
									},
									"properties": {
										"color": "#0d37c0",
										"dataLabel": {
											"visible": true
										}
									}
								}, {
									"dataContext": {
										"BalanceQuantity": {
											min: 81,
											max: 100
										}
									},
									"properties": {
										"color": "#0d13c0",
										"dataLabel": {
											"visible": true
										}
									}
								}, {
									"dataContext": {
										"BalanceQuantity": {
											min: 101,
											max: 150
										}
									},
									"properties": {
										"color": "#2b0dc0",
										"dataLabel": {
											"visible": true
										}
									}
								}, {
									"dataContext": {
										"BalanceQuantity": {
											min: 151,
											max: 200
										}
									},
									"properties": {
										"color": "#4f0dc0",
										"dataLabel": {
											"visible": true
										}
									}
								}, {
									"dataContext": {
										"BalanceQuantity": {
											min: 201,
											max: 250
										}
									},
									"properties": {
										"color": "#0ece56",
										"dataLabel": {
											"visible": true
										}
									}
								}, {
									"dataContext": {
										"BalanceQuantity": {
											min: 251,
											max: 300
										}
									},
									"properties": {
										"color": "#0dc050",
										"dataLabel": {
											"visible": true
										}
									}
								}, {
									"dataContext": {
										"BalanceQuantity": {
											min: 301,
											max: 350
										}
									},
									"properties": {
										"color": "#24a955",
										"dataLabel": {
											"visible": true
										}
									}
								}, {
									"dataContext": {
										"BalanceQuantity": {
											min: 351,
											max: 400
										}
									},
									"properties": {
										"color": "#ffb93c",
										"dataLabel": {
											"visible": true
										}
									}
								}, {
									"dataContext": {
										"BalanceQuantity": {
											min: 401,
											max: 500
										}
									},
									"properties": {
										"color": "#e19100",
										"dataLabel": {
											"visible": true
										}
									}
								}, {
									"dataContext": {
										"BalanceQuantity": {
											min: 501,
											max: 600
										}
									},
									"properties": {
										"color": "#c37d00",
										"dataLabel": {
											"visible": true
										}
									}
								}, {
									"dataContext": {
										"BalanceQuantity": {
											min: 601,
											max: 700
										}
									},
									"properties": {
										"color": "#b47300",
										"dataLabel": {
											"visible": true
										}
									}
								}, {
									"dataContext": {
										"BalanceQuantity": {
											min: 701,
											max: 800
										}
									},
									"properties": {
										"color": "#ff0800",
										"dataLabel": {
											"visible": true
										}
									}
								}, {
									"dataContext": {
										"BalanceQuantity": {
											min: 801,
											max: 900
										}
									},
									"properties": {
										"color": "#ff002b",
										"dataLabel": {
											"visible": true
										}
									}
								}, {
									"dataContext": {
										"BalanceQuantity": {
											min: 901,
											max: 1000
										}
									},
									"properties": {
										"color": "#de550c",
										"dataLabel": {
											"visible": true
										}
									}
								}, {
									"dataContext": {
										"BalanceQuantity": {
											min: 1001,
											max: 1200
										}
									},
									"properties": {
										"color": "#f44d72",
										"dataLabel": {
											"visible": true
										}
									}
								}, {
									"dataContext": {
										"BalanceQuantity": {
											min: 1201,
											max: 1400
										}
									},
									"properties": {
										"color": "#ffa200",
										"dataLabel": {
											"visible": true
										}
									}
								}, {
									"dataContext": {
										"BalanceQuantity": {
											min: 1401,
											max: 1600
										}
									},
									"properties": {
										"color": "#ffa500",
										"dataLabel": {
											"visible": true
										}
									}
								}, {
									"dataContext": {
										"BalanceQuantity": {
											min: 1601,
											max: 1800
										}
									},
									"properties": {
										"color": "#ffa500",
										"dataLabel": {
											"visible": true
										}
									}
								}, {
									"dataContext": {
										"BalanceQuantity": {
											min: 1801,
											max: 2000
										}
									},
									"properties": {
										"color": "#ffbf76",
										"dataLabel": {
											"visible": true
										}
									}
								}, {
									"dataContext": {
										"BalanceQuantity": {
											min: 2001,
											max: 2200
										}
									},
									"properties": {
										"color": "#ff5b1e",
										"dataLabel": {
											"visible": true
										}
									}
								}, {
									"dataContext": {
										"BalanceQuantity": {
											min: 2201,
											max: 2400
										}
									},
									"properties": {
										"color": "#FF8C00",
										"dataLabel": {
											"visible": true
										}
									}
								}, {
									"dataContext": {
										"BalanceQuantity": {
											min: 2401,
											max: 2600
										}
									},
									"properties": {
										"color": "#FF7F50",
										"dataLabel": {
											"visible": true
										}
									}
								}, {
									"dataContext": {
										"BalanceQuantity": {
											min: 2601,
											max: 2800
										}
									},
									"properties": {
										"color": "#FF6347",
										"dataLabel": {
											"visible": true
										}
									}
								}, {
									"dataContext": {
										"BalanceQuantity": {
											min: 2801,
											max: 10000000
										}
									},
									"properties": {
										"color": "#E10000",
										"dataLabel": {
											"visible": true
										}
									}
								}]
							},
							dataLabel: {
								visible: false,
								style: {
									fontSize: "12px",
									fontFamily: "Segoe UI Semibold"
								}
							},
							drawingEffect: "glossy"
						},
						legend: {
							visible: false,
							label: {
								style: {
									fontSize: "12px",
									fontFamily: "Segoe UI Semibold"
								}
							}
						},
						legendGroup: {
							layout: {
								position: "bottom",
								alignment: "center"
							}
						},
						categoryAxis: {
							visible: true,
							axisTick: {
								visible: true
							},
							label: {
								style: {
									fontSize: "12px",
									fontFamily: "Segoe UI Semibold"
								},
								visible: true
							},
							title: {
								visible: true,
								text: "Material",
								style: {
									fontSize: "14px",
									fontFamily: "Segoe UI Semibold",
									color: "#000000"
								}
							}
						},
						valueAxis: {
							axisLine: {
								visible: false
							},
							title: {
								visible: true,
								text: "Balance Quantity",
								style: {
									fontSize: "14px",
									fontFamily: "Segoe UI Semibold",
									color: "#000000"
								}
							},
							axisTick: {
								visible: false
							}
						},
						title: {
							visible: false,
							text: "",
							style: {
								fontSize: "14px",
								fontFamily: "Segoe UI Semibold"
							}
						}
					});
					that.getView().byId("MaterailName").setText(exportArray[0].materialDesc);
					that.getView().byId("PlantName").setText(exportArray[0].plantDesc);
					that.getView().byId("CustomerName").setText(exportArray[0].customerDesc);
					that.getView().byId("SaleOrdQty").setText(exportArray[0].orderQty);
					that.getView().byId("SaleOrdUnit").setText(exportArray[0].unit);
					that.getView().byId("InvoicedQty").setText(exportArray[0].invoiceQty);
					that.getView().byId("InvQtyUnit").setText(exportArray[0].unit);
					that.getView().byId("BalQty").setText(exportArray[0].balanceQty);
					that.getView().byId("BalQtyUnit").setText(exportArray[0].unit);

				}
			});
			var oModelTab = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Z_SCMEXPORDTBL_CDS/");
			oModelTab.read("/Z_SCMEXPORDTBL", {
				success: function (data, response) {
					var oResults = data.results;
					for (var i = 0; i < oResults.length; i++) {
						exportTabArr.push({
							customer: oResults[i].Customer,
							customerDesc: oResults[i].CustomerDesc,
							salesOrder: oResults[i].SalesOrder,
							item: oResults[i].Item,
							plant: oResults[i].Plant,
							plantDesc: oResults[i].PlantDesc,
							orderQty: Number(oResults[i].OrderQty),
							invoiceQty: Number(oResults[i].InvoiceQty),
							materialNumber: oResults[i].MaterialNumber,
							materialDesc: oResults[i].MaterialDesc,
							balanceQty: Number(oResults[i].BalanceQty),
							unit: oResults[i].Unit,
						});
					}
					var tabModel = new sap.ui.model.json.JSONModel();
					tabModel.setData(exportTabArr);
					that.getView().setModel(tabModel, "mainTableBody");
					sap.ui.core.BusyIndicator.hide();
					var plant = exportTabArr[0].plant;
					var customer = exportTabArr[0].customer;
					var soComboData = [];
					var soData = [];
					for (var m = 0; m < exportTabArr.length; m++) {
						if (soData.indexOf(exportTabArr[m].salesOrder) === -1 &&
							exportTabArr[m].plant == plant && exportTabArr[m].customer == customer) {
							soData.push(exportTabArr[m].salesOrder);
						}
					}
					for (var n = 0; n < soData.length; n++) {
						var object = {};
						object.soDataCom = soData[n];
						object.key = n;
						soComboData.push(object);
					}
					var soComboModel = new sap.ui.model.json.JSONModel();
					soComboModel.setData(soComboData);
					soComboModel.setSizeLimit(500);
					that.getView().setModel(soComboModel, "saleOrder");

					var plantFilter = new sap.ui.model.Filter("plant", sap.ui.model.FilterOperator.EQ, plant);
					var customerFilter = new sap.ui.model.Filter("customer", sap.ui.model.FilterOperator.EQ, customer);
					that.getView().byId("mainTableBody").getBinding("items").filter([plantFilter, customerFilter]);

				}
			});
		},
		changePlantViz: function (oEvent) {
			var that = this;
			plantComboText = oEvent.oSource.getSelectedItem().mProperties.text;
			var custComboData = [];
			var custData = [];
			var custData1 = [];
			for (var m = 0; m < exportArray.length; m++) {
				if (custData.indexOf(exportArray[m].customer) === -1 &&
					custData1.indexOf(exportArray[m].customerDesc) === -1 &&
					exportArray[m].plant == plantComboText) {
					custData.push(exportArray[m].customer);
					custData1.push(exportArray[m].customerDesc);
				}
			}
			for (var n = 0; n < custData.length; n++) {
				var object = {};
				object.custDataCom = custData[n];
				object.custDescData = custData1[n];
				object.key = n;
				custComboData.push(object);
			}
			var custComboModel = new sap.ui.model.json.JSONModel();
			custComboModel.setData(custComboData);
			custComboModel.setSizeLimit(500);
			that.getView().setModel(custComboModel, "customer");
		},
		changeCustomerViz: function (oEvent) {
			this.getView().byId("datePicker").setValue(null);
			this.getView().byId("saleOrder").setSelectedItem(null);
			this.getView().byId("material").setSelectedItem(null);
			dateComboText = '';
			if (plantComboText === '') {
				var that = this;
				var plant = exportArray[0].plant;
				custComboText = oEvent.oSource.getSelectedItem().mProperties.text;
				var vizArray = [];
				for (var z = 0; z < exportArray.length; z++) {
					if (exportArray[z].plant === plant && exportArray[z].customer == custComboText) {
						vizArray.push({
							plant: exportArray[z].plant,
							customer: exportArray[z].customer,
							plantDesc: exportArray[z].plantDesc,
							customerDesc: exportArray[z].customerDesc,
							materialNumber: exportArray[z].materialNumber,
							materialDesc: exportArray[z].materialDesc,
							orderQty: exportArray[z].orderQty,
							invoiceQty: exportArray[z].invoiceQty,
							balanceQty: exportArray[z].balanceQty,
							unit: exportArray[z].unit
						});
					}
				}

				var vizModel = new sap.ui.model.json.JSONModel();
				vizModel.setData(vizArray);
				that.getView().setModel(vizModel, "orderVizframe");
				var orderVizframe = that.getView().byId("orderVizframe");
				orderVizframe.setVizProperties({
					"interaction": {
						"noninteractiveMode": false,
						"selectability": {
							"legendSelection": false,
							"axisLabelSelection": false,
							"mode": "EXCLUSIVE",
							"plotLassoSelection": false,
							"plotStdSelection": true
						}
					},
					tooltip: {
						visible: true
					},
					plotArea: {
						line: {
							marker: {
								visible: false
							}
						},
						gridline: {
							visible: true
						},
						dataPointSize: {
							min: 20,
							max: 30
						},
						dataPointStyle: {
							'rules': [{
								"dataContext": {
									"BalanceQuantity": {
										min: 0,
										max: 20
									}
								},
								"properties": {
									"color": "#0da2c0",
									"dataLabel": {
										"visible": true
									}
								}
							}, {
								"dataContext": {
									"BalanceQuantity": {
										min: 21,
										max: 40
									}
								},
								"properties": {
									"color": "#0d7ec0",
									"dataLabel": {
										"visible": true
									}
								}
							}, {
								"dataContext": {
									"BalanceQuantity": {
										min: 41,
										max: 60
									}
								},
								"properties": {
									"color": "#0d5bc0",
									"dataLabel": {
										"visible": true
									}
								}
							}, {
								"dataContext": {
									"BalanceQuantity": {
										min: 61,
										max: 80
									}
								},
								"properties": {
									"color": "#0d37c0",
									"dataLabel": {
										"visible": true
									}
								}
							}, {
								"dataContext": {
									"BalanceQuantity": {
										min: 81,
										max: 100
									}
								},
								"properties": {
									"color": "#0d13c0",
									"dataLabel": {
										"visible": true
									}
								}
							}, {
								"dataContext": {
									"BalanceQuantity": {
										min: 101,
										max: 150
									}
								},
								"properties": {
									"color": "#2b0dc0",
									"dataLabel": {
										"visible": true
									}
								}
							}, {
								"dataContext": {
									"BalanceQuantity": {
										min: 151,
										max: 200
									}
								},
								"properties": {
									"color": "#4f0dc0",
									"dataLabel": {
										"visible": true
									}
								}
							}, {
								"dataContext": {
									"BalanceQuantity": {
										min: 201,
										max: 250
									}
								},
								"properties": {
									"color": "#0ece56",
									"dataLabel": {
										"visible": true
									}
								}
							}, {
								"dataContext": {
									"BalanceQuantity": {
										min: 251,
										max: 300
									}
								},
								"properties": {
									"color": "#0dc050",
									"dataLabel": {
										"visible": true
									}
								}
							}, {
								"dataContext": {
									"BalanceQuantity": {
										min: 301,
										max: 350
									}
								},
								"properties": {
									"color": "#24a955",
									"dataLabel": {
										"visible": true
									}
								}
							}, {
								"dataContext": {
									"BalanceQuantity": {
										min: 351,
										max: 400
									}
								},
								"properties": {
									"color": "#ffb93c",
									"dataLabel": {
										"visible": true
									}
								}
							}, {
								"dataContext": {
									"BalanceQuantity": {
										min: 401,
										max: 500
									}
								},
								"properties": {
									"color": "#e19100",
									"dataLabel": {
										"visible": true
									}
								}
							}, {
								"dataContext": {
									"BalanceQuantity": {
										min: 501,
										max: 600
									}
								},
								"properties": {
									"color": "#c37d00",
									"dataLabel": {
										"visible": true
									}
								}
							}, {
								"dataContext": {
									"BalanceQuantity": {
										min: 601,
										max: 700
									}
								},
								"properties": {
									"color": "#b47300",
									"dataLabel": {
										"visible": true
									}
								}
							}, {
								"dataContext": {
									"BalanceQuantity": {
										min: 701,
										max: 800
									}
								},
								"properties": {
									"color": "#ff0800",
									"dataLabel": {
										"visible": true
									}
								}
							}, {
								"dataContext": {
									"BalanceQuantity": {
										min: 801,
										max: 900
									}
								},
								"properties": {
									"color": "#ff002b",
									"dataLabel": {
										"visible": true
									}
								}
							}, {
								"dataContext": {
									"BalanceQuantity": {
										min: 901,
										max: 1000
									}
								},
								"properties": {
									"color": "#de550c",
									"dataLabel": {
										"visible": true
									}
								}
							}, {
								"dataContext": {
									"BalanceQuantity": {
										min: 1001,
										max: 1200
									}
								},
								"properties": {
									"color": "#f44d72",
									"dataLabel": {
										"visible": true
									}
								}
							}, {
								"dataContext": {
									"BalanceQuantity": {
										min: 1201,
										max: 1400
									}
								},
								"properties": {
									"color": "#ffa200",
									"dataLabel": {
										"visible": true
									}
								}
							}, {
								"dataContext": {
									"BalanceQuantity": {
										min: 1401,
										max: 1600
									}
								},
								"properties": {
									"color": "#ffa500",
									"dataLabel": {
										"visible": true
									}
								}
							}, {
								"dataContext": {
									"BalanceQuantity": {
										min: 1601,
										max: 1800
									}
								},
								"properties": {
									"color": "#ffa500",
									"dataLabel": {
										"visible": true
									}
								}
							}, {
								"dataContext": {
									"BalanceQuantity": {
										min: 1801,
										max: 2000
									}
								},
								"properties": {
									"color": "#ffbf76",
									"dataLabel": {
										"visible": true
									}
								}
							}, {
								"dataContext": {
									"BalanceQuantity": {
										min: 2001,
										max: 2200
									}
								},
								"properties": {
									"color": "#ff5b1e",
									"dataLabel": {
										"visible": true
									}
								}
							}, {
								"dataContext": {
									"BalanceQuantity": {
										min: 2201,
										max: 2400
									}
								},
								"properties": {
									"color": "#FF8C00",
									"dataLabel": {
										"visible": true
									}
								}
							}, {
								"dataContext": {
									"BalanceQuantity": {
										min: 2401,
										max: 2600
									}
								},
								"properties": {
									"color": "#FF7F50",
									"dataLabel": {
										"visible": true
									}
								}
							}, {
								"dataContext": {
									"BalanceQuantity": {
										min: 2601,
										max: 2800
									}
								},
								"properties": {
									"color": "#FF6347",
									"dataLabel": {
										"visible": true
									}
								}
							}, {
								"dataContext": {
									"BalanceQuantity": {
										min: 2801,
										max: 10000000
									}
								},
								"properties": {
									"color": "#E10000",
									"dataLabel": {
										"visible": true
									}
								}
							}]
						},
						dataLabel: {
							visible: false,
							style: {
								fontSize: "12px",
								fontFamily: "Segoe UI Semibold"
							}
						},
						drawingEffect: "glossy"
					},
					legend: {
						visible: false,
						label: {
							style: {
								fontSize: "12px",
								fontFamily: "Segoe UI Semibold"
							}
						}
					},
					legendGroup: {
						layout: {
							position: "bottom",
							alignment: "center"
						}
					},
					categoryAxis: {
						visible: true,
						axisTick: {
							visible: true
						},
						label: {
							style: {
								fontSize: "12px",
								fontFamily: "Segoe UI Semibold"
							},
							visible: true
						},
						title: {
							visible: true,
							text: "Material",
							style: {
								fontSize: "14px",
								fontFamily: "Segoe UI Semibold",
								color: "#000000"
							}
						}
					},
					valueAxis: {
						axisLine: {
							visible: false
						},
						title: {
							visible: true,
							text: "Balance Quantity",
							style: {
								fontSize: "14px",
								fontFamily: "Segoe UI Semibold",
								color: "#000000"
							}
						},
						axisTick: {
							visible: false
						}
					},
					title: {
						visible: false,
						text: "",
						style: {
							fontSize: "14px",
							fontFamily: "Segoe UI Semibold"
						}
					}
				});
				var plantFilter = new sap.ui.model.Filter("plant", sap.ui.model.FilterOperator.EQ, plant);
				custFilter = new sap.ui.model.Filter("customer", sap.ui.model.FilterOperator.EQ, custComboText);
				that.getView().byId("mainTableBody").getBinding("items").filter([plantFilter, custFilter]);

				var plant = exportArray[0].plant;
				var soComboData = [];
				var soData = [];
				for (var m = 0; m < exportTabArr.length; m++) {
					if (soData.indexOf(exportTabArr[m].salesOrder) === -1 &&
						exportTabArr[m].plant == plant && exportTabArr[m].customer == custComboText) {
						soData.push(exportTabArr[m].salesOrder);
					}
				}
				for (var n = 0; n < soData.length; n++) {
					var object = {};
					object.soDataCom = soData[n];
					object.key = n;
					soComboData.push(object);
				}
				var soComboModel = new sap.ui.model.json.JSONModel();
				soComboModel.setData(soComboData);
				soComboModel.setSizeLimit(500);
				that.getView().setModel(soComboModel, "saleOrder");

			} else {
				var that = this;
				custComboText = oEvent.oSource.getSelectedItem().mProperties.text;
				var vizArray = [];
				for (var z = 0; z < exportArray.length; z++) {
					if (exportArray[z].plant === plantComboText && exportArray[z].customer == custComboText) {
						vizArray.push({
							plant: exportArray[z].plant,
							customer: exportArray[z].customer,
							plantDesc: exportArray[z].plantDesc,
							customerDesc: exportArray[z].customerDesc,
							materialNumber: exportArray[z].materialNumber,
							materialDesc: exportArray[z].materialDesc,
							orderQty: exportArray[z].orderQty,
							invoiceQty: exportArray[z].invoiceQty,
							balanceQty: exportArray[z].balanceQty,
							unit: exportArray[z].unit
						});
					}
				}

				var vizModel = new sap.ui.model.json.JSONModel();
				vizModel.setData(vizArray);
				that.getView().setModel(vizModel, "orderVizframe");

				var plantFilter = new sap.ui.model.Filter("plant", sap.ui.model.FilterOperator.EQ, plantComboText);
				custFilter = new sap.ui.model.Filter("customer", sap.ui.model.FilterOperator.EQ, custComboText);
				that.getView().byId("mainTableBody").getBinding("items").filter([plantFilter, custFilter]);
				var soComboData = [];
				var soData = [];
				for (var m = 0; m < exportTabArr.length; m++) {
					if (soData.indexOf(exportTabArr[m].salesOrder) === -1 &&
						exportTabArr[m].plant == plantComboText && exportTabArr[m].customer == custComboText) {
						soData.push(exportTabArr[m].salesOrder);
					}
				}
				for (var n = 0; n < soData.length; n++) {
					var object = {};
					object.soDataCom = soData[n];
					object.key = n;
					soComboData.push(object);
				}
				var soComboModel = new sap.ui.model.json.JSONModel();
				soComboModel.setData(soComboData);
				soComboModel.setSizeLimit(500);
				that.getView().setModel(soComboModel, "saleOrder");
			}
		},
		changeDateViz: function (oEvent) {
			dateComboText = oEvent.mParameters.value;
			var oFormat = sap.ui.core.format.DateFormat.getInstance({
				pattern: "yyyy-MM-dd"
			});
			if (plantComboText == '' && custComboText == '') {
				var fromDate = oFormat.format(oEvent.mParameters.from) + "T12:00:00";
				var toDate = oFormat.format(oEvent.mParameters.to) + "T12:00:00";
				var plantDate = exportArray[0].plant;
				var custDate = exportArray[0].customer;
				var exportServiceUrl = "/sap/opu/odata/sap/Z_SCMEXPORDDATE_CDS";
				dateRangeArray = [];
				var oModel = new sap.ui.model.odata.v2.ODataModel({
					serviceUrl: exportServiceUrl,
					async: false,
					json: true,
					useBatch: false
				});
				var that = this;
				oModel.read("/Z_SCMEXPORDDATE(p_Plant=" + "'" + plantDate + "',p_Customer=" + "'" + custDate + "',p_BillingDate=datetime" + "'" +
					fromDate + "',p_BillingDateTo=datetime" + "'" + toDate + "')/Set", {
						async: false,
						success: function (data, response) {
							var oResults = data.results;
							for (var i = 0; i < oResults.length; i++) {
								dateRangeArray.push({
									customer: oResults[i].Customer,
									customerDesc: oResults[i].CustomerDesc,
									plant: oResults[i].Plant,
									plantDesc: oResults[i].PlantDesc,
									orderQty: Number(oResults[i].OrderQty),
									invoiceQty: Number(oResults[i].InvoiceQty),
									materialNumber: oResults[i].MaterialNumber,
									materialDesc: oResults[i].MaterialDesc,
									balanceQty: Number(oResults[i].BalanceQty),
									unit: oResults[i].Unit
								});
							}
							var vizModel = new sap.ui.model.json.JSONModel();
							vizModel.setData(dateRangeArray);
							that.getView().setModel(vizModel, "orderVizframe");
						}

					});
			} else if (plantComboText == '' && custComboText != '') {
				var fromDate = oFormat.format(oEvent.mParameters.from) + "T12:00:00";
				var toDate = oFormat.format(oEvent.mParameters.to) + "T12:00:00";
				var plantDate = exportArray[0].plant;
				var exportServiceUrl = "/sap/opu/odata/sap/Z_SCMEXPORDDATE_CDS";
				dateRangeArray = [];
				var oModel = new sap.ui.model.odata.v2.ODataModel({
					serviceUrl: exportServiceUrl,
					async: false,
					json: true,
					useBatch: false
				});
				var that = this;
				oModel.read("/Z_SCMEXPORDDATE(p_Plant=" + "'" + plantDate + "',p_Customer=" + "'" + custComboText + "',p_BillingDate=datetime" +
					"'" + fromDate + "',p_BillingDateTo=datetime" + "'" + toDate + "')/Set", {
						async: false,
						success: function (data, response) {
							var oResults = data.results;
							for (var i = 0; i < oResults.length; i++) {
								dateRangeArray.push({
									customer: oResults[i].Customer,
									customerDesc: oResults[i].CustomerDesc,
									plant: oResults[i].Plant,
									plantDesc: oResults[i].PlantDesc,
									orderQty: oResults[i].OrderQty,
									invoiceQty: oResults[i].InvoiceQty,
									materialNumber: oResults[i].MaterialNumber,
									materialDesc: oResults[i].MaterialDesc,
									balanceQty: oResults[i].BalanceQty,
									unit: oResults[i].Unit
								});
							}
							var vizModel = new sap.ui.model.json.JSONModel();
							vizModel.setData(dateRangeArray);
							that.getView().setModel(vizModel, "orderVizframe");
						}

					});
			} else {
				var fromDate = oFormat.format(oEvent.mParameters.from) + "T12:00:00";
				var toDate = oFormat.format(oEvent.mParameters.to) + "T12:00:00";
				var exportServiceUrl = "/sap/opu/odata/sap/Z_SCMEXPORDDATE_CDS";
				dateRangeArray = [];
				var oModel = new sap.ui.model.odata.v2.ODataModel({
					serviceUrl: exportServiceUrl,
					async: false,
					json: true,
					useBatch: false
				});
				var that = this;
				oModel.read("/Z_SCMEXPORDDATE(p_Plant=" + "'" + plantComboText + "',p_Customer=" + "'" + custComboText +
					"',p_BillingDate=datetime" + "'" + fromDate + "',p_BillingDateTo=datetime" + "'" + toDate + "')/Set", {
						async: false,
						success: function (data, response) {
							var oResults = data.results;
							for (var i = 0; i < oResults.length; i++) {
								dateRangeArray.push({
									customer: oResults[i].Customer,
									customerDesc: oResults[i].CustomerDesc,
									plant: oResults[i].Plant,
									plantDesc: oResults[i].PlantDesc,
									orderQty: oResults[i].OrderQty,
									invoiceQty: oResults[i].InvoiceQty,
									materialNumber: oResults[i].MaterialNumber,
									materialDesc: oResults[i].MaterialDesc,
									balanceQty: oResults[i].BalanceQty,
									unit: oResults[i].Unit
								});
							}
							var vizModel = new sap.ui.model.json.JSONModel();
							vizModel.setData(dateRangeArray);
							that.getView().setModel(vizModel, "orderVizframe");
						}
					});

			}
		},
		getTableIcon: function (oEvent) {
			var table = oEvent.getSource().getSelectedContent().mProperties.title;
			if (table == "Table") {
				this.getView().byId("saleOrderGrp").setVisible(true);
				this.getView().byId("materialGrp").setVisible(true);
				this.getView().byId("datePickerGrp").setVisible(false);
			} else {
				this.getView().byId("saleOrderGrp").setVisible(false);
				this.getView().byId("materialGrp").setVisible(false);
				this.getView().byId("datePickerGrp").setVisible(true);
			}

		},
		changeSaleOrderTbl: function (oEvent) {
			var that = this;
			that.getView().byId("material").setSelectedItem(null);
			if (plantComboText == '' && custComboText == '') {
				var plant = exportArray[0].plant;
				var customer = exportArray[0].customer;
				var saleOrderComboText = oEvent.oSource.getSelectedItem().mProperties.text;
				saleOrderFilter = new sap.ui.model.Filter("salesOrder", sap.ui.model.FilterOperator.EQ, saleOrderComboText);
				that.getView().byId("mainTableBody").getBinding("items").filter(saleOrderFilter);
				var matComboData = [];
				var matData = [];
				var matData1 = [];
				for (var m = 0; m < exportTabArr.length; m++) {
					if (matData.indexOf(exportTabArr[m].materialNumber) === -1 &&
						matData1.indexOf(exportTabArr[m].materialDesc) === -1 &&
						exportTabArr[m].plant == plant && exportTabArr[m].customer == customer && exportTabArr[m].salesOrder == saleOrderComboText) {
						matData.push(exportTabArr[m].materialNumber);
						matData1.push(exportTabArr[m].materialDesc);
					}
				}
				for (var n = 0; n < matData.length; n++) {
					var object = {};
					object.matDataCom = matData[n];
					object.matDescData = matData1[n];
					object.key = n;
					matComboData.push(object);
				}
				var matComboModel = new sap.ui.model.json.JSONModel();
				matComboModel.setData(matComboData);
				matComboModel.setSizeLimit(500);
				that.getView().setModel(matComboModel, "material");
			} else if (plantComboText == '' && custComboText != '') {
				var plant = exportArray[0].plant;
				var saleOrderComboText = oEvent.oSource.getSelectedItem().mProperties.text;
				saleOrderFilter = new sap.ui.model.Filter("salesOrder", sap.ui.model.FilterOperator.EQ, saleOrderComboText);
				that.getView().byId("mainTableBody").getBinding("items").filter([custFilter, saleOrderFilter]);
				var matComboData = [];
				var matData = [];
				var matData1 = [];
				for (var m = 0; m < exportTabArr.length; m++) {
					if (matData.indexOf(exportTabArr[m].materialNumber) === -1 &&
						matData1.indexOf(exportTabArr[m].materialDesc) === -1 &&
						exportTabArr[m].plant == plant && exportTabArr[m].customer == custComboText && exportTabArr[m].salesOrder == saleOrderComboText) {
						matData.push(exportTabArr[m].materialNumber);
						matData1.push(exportTabArr[m].materialDesc);
					}
				}
				for (var n = 0; n < matData.length; n++) {
					var object = {};
					object.matDataCom = matData[n];
					object.matDescData = matData1[n];
					object.key = n;
					matComboData.push(object);
				}
				var matComboModel = new sap.ui.model.json.JSONModel();
				matComboModel.setData(matComboData);
				matComboModel.setSizeLimit(500);
				that.getView().setModel(matComboModel, "material");
			} else {
				var saleOrderComboText = oEvent.oSource.getSelectedItem().mProperties.text;
				saleOrderFilter = new sap.ui.model.Filter("salesOrder", sap.ui.model.FilterOperator.EQ, saleOrderComboText);
				that.getView().byId("mainTableBody").getBinding("items").filter([custFilter, saleOrderFilter]);
				var matComboData = [];
				var matData = [];
				var matData1 = [];
				for (var m = 0; m < exportTabArr.length; m++) {
					if (matData.indexOf(exportTabArr[m].materialNumber) === -1 &&
						matData1.indexOf(exportTabArr[m].materialDesc) === -1 &&
						exportTabArr[m].plant == plantComboText && exportTabArr[m].customer == custComboText && exportTabArr[m].salesOrder ==
						saleOrderComboText) {
						matData.push(exportTabArr[m].materialNumber);
						matData1.push(exportTabArr[m].materialDesc);
					}
				}
				for (var n = 0; n < matData.length; n++) {
					var object = {};
					object.matDataCom = matData[n];
					object.matDescData = matData1[n];
					object.key = n;
					matComboData.push(object);
				}
				var matComboModel = new sap.ui.model.json.JSONModel();
				matComboModel.setData(matComboData);
				matComboModel.setSizeLimit(500);
				that.getView().setModel(matComboModel, "material");
			}
		},
		changeMatTab: function (oEvent) {
			var that = this;
			var matComboText = oEvent.oSource.getSelectedItem().mProperties.text;
			var matFilter = new sap.ui.model.Filter("materialNumber", sap.ui.model.FilterOperator.EQ, matComboText);
			that.getView().byId("mainTableBody").getBinding("items").filter([saleOrderFilter, matFilter]);
		},
		getListData: function (oEvent) {
			var that = this;
			if (plantComboText == '' && custComboText == '' && dateComboText == '') {
				var listArray = [];
				var plant = exportArray[0].plant;
				var customer = exportArray[0].customer;
				var matChartText = oEvent.getParameters().data[0].data.Material;
				that.getView().byId("MaterailName").setText(matChartText);
				for (var z = 0; z < exportArray.length; z++) {
					if (exportArray[z].materialDesc === matChartText && exportArray[z].plant === plant && exportArray[z].customer === customer) {
						listArray.push({
							plant: exportArray[z].plant,
							customer: exportArray[z].customer,
							plantDesc: exportArray[z].plantDesc,
							customerDesc: exportArray[z].customerDesc,
							materialNumber: exportArray[z].materialNumber,
							materialDesc: exportArray[z].materialDesc,
							orderQty: exportArray[z].orderQty,
							invoiceQty: exportArray[z].invoiceQty,
							balanceQty: exportArray[z].balanceQty,
							unit: exportArray[z].unit
						});
					}
				}
				that.getView().byId("PlantName").setText(listArray[0].plantDesc);
				that.getView().byId("CustomerName").setText(listArray[0].customerDesc);
				that.getView().byId("SaleOrdQty").setText(listArray[0].orderQty);
				that.getView().byId("SaleOrdUnit").setText(listArray[0].unit);
				that.getView().byId("InvoicedQty").setText(listArray[0].invoiceQty);
				that.getView().byId("InvQtyUnit").setText(listArray[0].unit);
				that.getView().byId("BalQty").setText(listArray[0].balanceQty);
				that.getView().byId("BalQtyUnit").setText(listArray[0].unit);
			} else if (plantComboText == '' && custComboText != '' && dateComboText == '') {
				var listArray = [];
				var plant = exportArray[0].plant;
				var matChartText = oEvent.getParameters().data[0].data.Material;
				that.getView().byId("MaterailName").setText(matChartText);
				for (var z = 0; z < exportArray.length; z++) {
					if (exportArray[z].materialDesc === matChartText && exportArray[z].plant === plant && exportArray[z].customer === custComboText) {
						listArray.push({
							plant: exportArray[z].plant,
							customer: exportArray[z].customer,
							plantDesc: exportArray[z].plantDesc,
							customerDesc: exportArray[z].customerDesc,
							materialNumber: exportArray[z].materialNumber,
							materialDesc: exportArray[z].materialDesc,
							orderQty: exportArray[z].orderQty,
							invoiceQty: exportArray[z].invoiceQty,
							balanceQty: exportArray[z].balanceQty,
							unit: exportArray[z].unit
						});
					}
				}
				that.getView().byId("PlantName").setText(listArray[0].plantDesc);
				that.getView().byId("CustomerName").setText(listArray[0].customerDesc);
				that.getView().byId("SaleOrdQty").setText(listArray[0].orderQty);
				that.getView().byId("SaleOrdUnit").setText(listArray[0].unit);
				that.getView().byId("InvoicedQty").setText(listArray[0].invoiceQty);
				that.getView().byId("InvQtyUnit").setText(listArray[0].unit);
				that.getView().byId("BalQty").setText(listArray[0].balanceQty);
				that.getView().byId("BalQtyUnit").setText(listArray[0].unit);
			} else if (plantComboText != '' && custComboText != '' && dateComboText == '') {
				var listArray = [];
				var matChartText = oEvent.getParameters().data[0].data.Material;
				that.getView().byId("MaterailName").setText(matChartText);
				for (var z = 0; z < exportArray.length; z++) {
					if (exportArray[z].materialDesc === matChartText && exportArray[z].plant === plantComboText && exportArray[z].customer ===
						custComboText) {
						listArray.push({
							plant: exportArray[z].plant,
							customer: exportArray[z].customer,
							plantDesc: exportArray[z].plantDesc,
							customerDesc: exportArray[z].customerDesc,
							materialNumber: exportArray[z].materialNumber,
							materialDesc: exportArray[z].materialDesc,
							orderQty: exportArray[z].orderQty,
							invoiceQty: exportArray[z].invoiceQty,
							balanceQty: exportArray[z].balanceQty,
							unit: exportArray[z].unit
						});
					}
				}
				that.getView().byId("PlantName").setText(listArray[0].plantDesc);
				that.getView().byId("CustomerName").setText(listArray[0].customerDesc);
				that.getView().byId("SaleOrdQty").setText(listArray[0].orderQty);
				that.getView().byId("SaleOrdUnit").setText(listArray[0].unit);
				that.getView().byId("InvoicedQty").setText(listArray[0].invoiceQty);
				that.getView().byId("InvQtyUnit").setText(listArray[0].unit);
				that.getView().byId("BalQty").setText(listArray[0].balanceQty);
				that.getView().byId("BalQtyUnit").setText(listArray[0].unit);
			} else if (plantComboText == '' && custComboText == '' && dateComboText != '') {
				var listArray = [];
				var plant = exportArray[0].plant;
				var customer = exportArray[0].customer;
				var matChartText = oEvent.getParameters().data[0].data.Material;
				that.getView().byId("MaterailName").setText(matChartText);
				for (var z = 0; z < dateRangeArray.length; z++) {
					if (dateRangeArray[z].materialDesc == matChartText && dateRangeArray[z].plant == plant && dateRangeArray[z].customer ==
						customer) {
						listArray.push({
							plant: dateRangeArray[z].plant,
							customer: dateRangeArray[z].customer,
							plantDesc: dateRangeArray[z].plantDesc,
							customerDesc: dateRangeArray[z].customerDesc,
							materialNumber: dateRangeArray[z].materialNumber,
							materialDesc: dateRangeArray[z].materialDesc,
							orderQty: dateRangeArray[z].orderQty,
							invoiceQty: dateRangeArray[z].invoiceQty,
							balanceQty: dateRangeArray[z].balanceQty,
							unit: dateRangeArray[z].unit
						});
					}
				}
				that.getView().byId("PlantName").setText(listArray[0].plantDesc);
				that.getView().byId("CustomerName").setText(listArray[0].customerDesc);
				that.getView().byId("SaleOrdQty").setText(listArray[0].orderQty);
				that.getView().byId("SaleOrdUnit").setText(listArray[0].unit);
				that.getView().byId("InvoicedQty").setText(listArray[0].invoiceQty);
				that.getView().byId("InvQtyUnit").setText(listArray[0].unit);
				that.getView().byId("BalQty").setText(listArray[0].balanceQty);
				that.getView().byId("BalQtyUnit").setText(listArray[0].unit);
			} else if (plantComboText == '' && custComboText != '' && dateComboText != '') {
				var listArray = [];
				var plant = exportArray[0].plant;
				var matChartText = oEvent.getParameters().data[0].data.Material;
				that.getView().byId("MaterailName").setText(matChartText);
				for (var z = 0; z < dateRangeArray.length; z++) {
					if (dateRangeArray[z].materialDesc === matChartText && dateRangeArray[z].plant === plant && dateRangeArray[z].customer ===
						custComboText) {
						listArray.push({
							plant: dateRangeArray[z].plant,
							customer: dateRangeArray[z].customer,
							plantDesc: dateRangeArray[z].plantDesc,
							customerDesc: dateRangeArray[z].customerDesc,
							materialNumber: dateRangeArray[z].materialNumber,
							materialDesc: dateRangeArray[z].materialDesc,
							orderQty: dateRangeArray[z].orderQty,
							invoiceQty: dateRangeArray[z].invoiceQty,
							balanceQty: dateRangeArray[z].balanceQty,
							unit: dateRangeArray[z].unit
						});
					}
				}
				that.getView().byId("PlantName").setText(listArray[0].plantDesc);
				that.getView().byId("CustomerName").setText(listArray[0].customerDesc);
				that.getView().byId("SaleOrdQty").setText(listArray[0].orderQty);
				that.getView().byId("SaleOrdUnit").setText(listArray[0].unit);
				that.getView().byId("InvoicedQty").setText(listArray[0].invoiceQty);
				that.getView().byId("InvQtyUnit").setText(listArray[0].unit);
				that.getView().byId("BalQty").setText(listArray[0].balanceQty);
				that.getView().byId("BalQtyUnit").setText(listArray[0].unit);
			} else if (plantComboText != '' && custComboText != '' && dateComboText != '') {
				var listArray = [];
				var matChartText = oEvent.getParameters().data[0].data.Material;
				that.getView().byId("MaterailName").setText(matChartText);
				for (var z = 0; z < dateRangeArray.length; z++) {
					if (dateRangeArray[z].materialDesc === matChartText && dateRangeArray[z].plant === plantComboText && dateRangeArray[z].customer ===
						custComboText) {
						listArray.push({
							plant: dateRangeArray[z].plant,
							customer: dateRangeArray[z].customer,
							plantDesc: dateRangeArray[z].plantDesc,
							customerDesc: dateRangeArray[z].customerDesc,
							materialNumber: dateRangeArray[z].materialNumber,
							materialDesc: dateRangeArray[z].materialDesc,
							orderQty: dateRangeArray[z].orderQty,
							invoiceQty: dateRangeArray[z].invoiceQty,
							balanceQty: dateRangeArray[z].balanceQty,
							unit: dateRangeArray[z].unit
						});
					}
				}
				that.getView().byId("PlantName").setText(listArray[0].plantDesc);
				that.getView().byId("CustomerName").setText(listArray[0].customerDesc);
				that.getView().byId("SaleOrdQty").setText(listArray[0].orderQty);
				that.getView().byId("SaleOrdUnit").setText(listArray[0].unit);
				that.getView().byId("InvoicedQty").setText(listArray[0].invoiceQty);
				that.getView().byId("InvQtyUnit").setText(listArray[0].unit);
				that.getView().byId("BalQty").setText(listArray[0].balanceQty);
				that.getView().byId("BalQtyUnit").setText(listArray[0].unit);
			}

		}
	});
});