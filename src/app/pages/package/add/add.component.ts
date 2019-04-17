import { Component } from '@angular/core';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
})
export class PackageAddComponent {

	createdBy = 'Creation Officer 1';
	registeredBy = 'Registration Officer 1';
	approvedBy = 'Approval Officer 1';

	categories = [{text: 'Category - 1', value: 'cat1'},
		{text: 'Category - 2', value: 'cat2'},
		{text: 'Category - 3', value: 'cat3'},
		{text: 'Category - 4', value: 'cat4'},
		{text: 'Category - 5', value: 'cat5'},
		{text: 'Category - 6', value: 'cat6'},
		{text: 'Category - 7', value: 'cat7'},
		{text: 'Category - 8', value: 'cat8'},
		{text: 'Category - 9', value: 'cat9'}];

	subCategories = [{text: 'Sub-Category - 1', value: 'subCat1'},
		{text: 'Sub Category - 2', value: 'subCat2'},
		{text: 'Sub Category - 3', value: 'subCat3'},
		{text: 'Sub Category - 4', value: 'subCat4'},
		{text: 'Sub Category - 5', value: 'subCat5'},
		{text: 'Sub Category - 6', value: 'subCat6'},
		{text: 'Sub Category - 7', value: 'subCat7'},
		{text: 'Sub Category - 8', value: 'subCat8'},
		{text: 'Sub Category - 9', value: 'subCat9'}];

	subTypes = [{text: 'Sub-Type - 1', value: 'subType1'},
		{text: 'Sub Type - 2', value: 'subType2'},
		{text: 'Sub Type - 3', value: 'subType3'},
		{text: 'Sub Type - 4', value: 'subType4'},
		{text: 'Sub Type - 5', value: 'subType5'},
		{text: 'Sub Type - 6', value: 'subType6'},
		{text: 'Sub Type - 7', value: 'subType7'},
		{text: 'Sub Type - 8', value: 'subType8'},
		{text: 'Sub Type - 9', value: 'subType9'}];

	designations = [{text: 'Designation - 1', value: 'designation1'},
		{text: 'Designation - 2', value: 'designation2'},
		{text: 'Designation - 3', value: 'designation3'},
		{text: 'Designation - 4', value: 'designation4'},
		{text: 'Designation - 5', value: 'designation5'},
		{text: 'Designation - 6', value: 'designation6'},
		{text: 'Designation - 7', value: 'designation7'},
		{text: 'Designation - 8', value: 'designation8'},
		{text: 'Designation - 9', value: 'designation9'}];

	registrationStatuses = [{text: 'Registration-Status - 1', value: 'registrationStatus1'},
		{text: 'Registration Status - 2', value: 'registrationStatus2'},
		{text: 'Registration Status - 3', value: 'registrationStatus3'},
		{text: 'Registration Status - 4', value: 'registrationStatus4'},
		{text: 'Registration Status - 5', value: 'registrationStatus5'},
		{text: 'Registration Status - 6', value: 'registrationStatus6'},
		{text: 'Registration Status - 7', value: 'registrationStatus7'},
		{text: 'Registration Status - 8', value: 'registrationStatus8'},
		{text: 'Registration Status - 9', value: 'registrationStatus9'}];

	documentTypes = [{text: 'Document-Type - 1', value: 'documentType1'},
		{text: 'Document Type - 2', value: 'documentType2'},
		{text: 'Document Type - 3', value: 'documentType3'},
		{text: 'Document Type - 4', value: 'documentType4'},
		{text: 'Document Type - 5', value: 'documentType5'},
		{text: 'Document Type - 6', value: 'documentType6'},
		{text: 'Document Type - 7', value: 'documentType7'},
		{text: 'Document Type - 8', value: 'documentType8'},
		{text: 'Document Type - 9', value: 'documentType9'}];

	states = [{text: 'State - 1', value: 'state1'},
		{text: 'State - 2', value: 'state2'},
		{text: 'State - 3', value: 'state3'},
		{text: 'State - 4', value: 'state4'},
		{text: 'State - 5', value: 'state5'},
		{text: 'State - 6', value: 'state6'},
		{text: 'State - 7', value: 'state7'},
		{text: 'State - 8', value: 'state8'},
		{text: 'State - 9', value: 'state9'}];

	countries = [{text: 'Country - 1', value: 'country1'},
		{text: 'Country - 2', value: 'country2'},
		{text: 'Country - 3', value: 'country3'},
		{text: 'Country - 4', value: 'country4'},
		{text: 'Country - 5', value: 'country5'},
		{text: 'Country - 6', value: 'country6'},
		{text: 'Country - 7', value: 'country7'},
		{text: 'Country - 8', value: 'country8'},
		{text: 'Country - 9', value: 'country9'}];

	accountTypes = [{text: 'Account Type - 1', value: 'accountType1'},
		{text: 'Account Type - 2', value: 'accountType2'},
		{text: 'Account Type - 3', value: 'accountType3'},
		{text: 'Account Type - 4', value: 'accountType4'},
		{text: 'Account Type - 5', value: 'accountType5'},
		{text: 'Account Type - 6', value: 'accountType6'},
		{text: 'Account Type - 7', value: 'accountType7'},
		{text: 'Account Type - 8', value: 'accountType8'},
		{text: 'Account Type - 9', value: 'accountType9'}];

	preferedPaymentMethods = [{text: 'Prefered Payment Method - 1', value: 'preferedPaymentMethod1'},
		{text: 'Prefered Payment Method - 2', value: 'preferedPaymentMethod2'},
		{text: 'Prefered Payment Method - 3', value: 'preferedPaymentMethod3'},
		{text: 'Prefered Payment Method - 4', value: 'preferedPaymentMethod4'},
		{text: 'Prefered Payment Method - 5', value: 'preferedPaymentMethod5'},
		{text: 'Prefered Payment Method - 6', value: 'preferedPaymentMethod6'},
		{text: 'Prefered Payment Method - 7', value: 'preferedPaymentMethod7'},
		{text: 'Prefered Payment Method - 8', value: 'preferedPaymentMethod8'},
		{text: 'Prefered Payment Method - 9', value: 'preferedPaymentMethod9'}];

	constitutionOfBusinesses = [{text: 'Constitution Of Business - 1', value: 'constitutionOfBusiness1'},
		{text: 'Constitution Of Business - 2', value: 'constitutionOfBusiness2'},
		{text: 'Constitution Of Business - 3', value: 'constitutionOfBusiness3'},
		{text: 'Constitution Of Business - 4', value: 'constitutionOfBusiness4'},
		{text: 'Constitution Of Business - 5', value: 'constitutionOfBusiness5'},
		{text: 'Constitution Of Business - 6', value: 'constitutionOfBusiness6'},
		{text: 'Constitution Of Business - 7', value: 'constitutionOfBusiness7'},
		{text: 'Constitution Of Business - 8', value: 'constitutionOfBusiness8'},
		{text: 'Constitution Of Business - 9', value: 'constitutionOfBusiness9'}];

	msmeStatuses = [{text: 'MSME Status - 1', value: 'msmeStatus1'},
		{text: 'MSME Status - 2', value: 'msmeStatus2'},
		{text: 'MSME Status - 3', value: 'msmeStatus3'},
		{text: 'MSME Status - 4', value: 'msmeStatus4'},
		{text: 'MSME Status - 5', value: 'msmeStatus5'},
		{text: 'MSME Status - 6', value: 'msmeStatus6'},
		{text: 'MSME Status - 7', value: 'msmeStatus7'},
		{text: 'MSME Status - 8', value: 'msmeStatus8'},
		{text: 'MSME Status - 9', value: 'msmeStatus9'}];

	paymentTerms = [{text: 'Payment Term - 1', value: 'paymentTerm1'},
		{text: 'Payment Term - 2', value: 'paymentTerm2'},
		{text: 'Payment Term - 3', value: 'paymentTerm3'},
		{text: 'Payment Term - 4', value: 'paymentTerm4'},
		{text: 'Payment Term - 5', value: 'paymentTerm5'},
		{text: 'Payment Term - 6', value: 'paymentTerm6'},
		{text: 'Payment Term - 7', value: 'paymentTerm7'},
		{text: 'Payment Term - 8', value: 'paymentTerm8'},
		{text: 'Payment Term - 9', value: 'paymentTerm9'}];

	gstRegistrationStatuses = [{text: 'GST Registration Status - 1', value: 'gstRegistrationStatus1'},
		{text: 'GST Registration Status - 2', value: 'gstRegistrationStatus2'},
		{text: 'GST Registration Status - 3', value: 'gstRegistrationStatus3'},
		{text: 'GST Registration Status - 4', value: 'gstRegistrationStatus4'},
		{text: 'GST Registration Status - 5', value: 'gstRegistrationStatus5'},
		{text: 'GST Registration Status - 6', value: 'gstRegistrationStatus6'},
		{text: 'GST Registration Status - 7', value: 'gstRegistrationStatus7'},
		{text: 'GST Registration Status - 8', value: 'gstRegistrationStatus8'},
		{text: 'GST Registration Status - 9', value: 'gstRegistrationStatus9'}];

	validatePackageRegistration(event):void {
		event.preventDefault();
		alert('Submit - Working');
	}

	validatePackageRegistrationKYPDocument(event):void {
		event.preventDefault();
		alert('Add - Working');
	}
}
