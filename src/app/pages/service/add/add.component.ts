import { Component } from '@angular/core';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
})
export class ServiceAddComponent {

  serviceAddFormSubmit(e) { console.log(e); }

	serviceEditForm = null;

	approvalOfficers = [{text: 'Approval Officer - 1', value: 'approvalOfficer1'},
		{text: 'Approval Officer - 2', value: 'approvalOfficer2'},
		{text: 'Approval Officer - 3', value: 'approvalOfficer3'},
		{text: 'Approval Officer - 4', value: 'approvalOfficer4'},
		{text: 'Approval Officer - 5', value: 'approvalOfficer5'},
		{text: 'Approval Officer - 6', value: 'approvalOfficer6'},
		{text: 'Approval Officer - 7', value: 'approvalOfficer7'},
		{text: 'Approval Officer - 8', value: 'approvalOfficer8'},
		{text: 'Approval Officer - 9', value: 'approvalOfficer9'}];

	registerationOfficers = [{text: 'Registeration Officer - 1', value: 'registerationOfficer1'},
		{text: 'Registeration Officer - 2', value: 'registerationOfficer2'},
		{text: 'Registeration Officer - 3', value: 'registerationOfficer3'},
		{text: 'Registeration Officer - 4', value: 'registerationOfficer4'},
		{text: 'Registeration Officer - 5', value: 'registerationOfficer5'},
		{text: 'Registeration Officer - 6', value: 'registerationOfficer6'},
		{text: 'Registeration Officer - 7', value: 'registerationOfficer7'},
		{text: 'Registeration Officer - 8', value: 'registerationOfficer8'},
		{text: 'Registeration Officer - 9', value: 'registerationOfficer9'}];

	categories = [{text: 'Category - 1', value: 'cat1'},
		{text: 'Category - 2', value: 'cat2'},
		{text: 'Category - 3', value: 'cat3'},
		{text: 'Category - 4', value: 'cat4'},
		{text: 'Category - 5', value: 'cat5'},
		{text: 'Category - 6', value: 'cat6'},
		{text: 'Category - 7', value: 'cat7'},
		{text: 'Category - 8', value: 'cat8'},
		{text: 'Category - 9', value: 'cat9'}];

	subCategories = [{text: 'Sub Category - 1', value: 'subCategory1'},
		{text: 'Sub Category - 2', value: 'subCategory2'},
		{text: 'Sub Category - 3', value: 'subCategory3'},
		{text: 'Sub Category - 4', value: 'subCategory4'},
		{text: 'Sub Category - 5', value: 'subCategory5'},
		{text: 'Sub Category - 6', value: 'subCategory6'},
		{text: 'Sub Category - 7', value: 'subCategory7'},
		{text: 'Sub Category - 8', value: 'subCategory8'},
		{text: 'Sub Category - 9', value: 'subCategory9'}];

  serviceTypes = [{text: 'Service Type - 1', value: 'serviceType1'},
    {text: 'Service Type - 2', value: 'serviceType2'},
    {text: 'Service Type - 3', value: 'serviceType3'},
    {text: 'Service Type - 4', value: 'serviceType4'},
    {text: 'Service Type - 5', value: 'serviceType5'},
    {text: 'Service Type - 6', value: 'serviceType6'},
    {text: 'Service Type - 7', value: 'serviceType7'},
    {text: 'Service Type - 8', value: 'serviceType8'},
    {text: 'Service Type - 9', value: 'serviceType9'}];

  serviceActives = [{text: 'Service is Active - 1', value: 'serviceActive1'},
    {text: 'Service is Active - 2', value: 'serviceActive2'},
    {text: 'Service is Active - 3', value: 'serviceActive3'},
    {text: 'Service is Active - 4', value: 'serviceActive4'},
    {text: 'Service is Active - 5', value: 'serviceActive5'},
    {text: 'Service is Active - 6', value: 'serviceActive6'},
    {text: 'Service is Active - 7', value: 'serviceActive7'},
    {text: 'Service is Active - 8', value: 'serviceActive8'},
    {text: 'Service is Active - 9', value: 'serviceActive9'}];

  serviceProviders = [{text: 'Service Provider - 1', value: 'serviceProvider1'},
    {text: 'Service Provider - 2', value: 'serviceProvider2'},
    {text: 'Service Provider - 3', value: 'serviceProvider3'},
    {text: 'Service Provider - 4', value: 'serviceProvider4'},
    {text: 'Service Provider - 5', value: 'serviceProvider5'},
    {text: 'Service Provider - 6', value: 'serviceProvider6'},
    {text: 'Service Provider - 7', value: 'serviceProvider7'},
    {text: 'Service Provider - 8', value: 'serviceProvider8'},
    {text: 'Service Provider - 9', value: 'serviceProvider9'}];
    
}
