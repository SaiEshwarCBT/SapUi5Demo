sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"exportOrder/ExportOrderFulfillment/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("exportOrder.ExportOrderFulfillment.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			window.exportArray = [];
			window.dateRangeArray = [];
			window.plantComboText = '';
			window.custComboText = '';
			window.dateComboText = '';
			window.exportTabArr = [];
			window.custFilter = '';
			window.saleOrderFilter = '';
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});