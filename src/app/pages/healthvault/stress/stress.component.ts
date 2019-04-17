import { Component } from '@angular/core';

@Component({
  selector: 'ngx-stress',
  templateUrl: './stress.component.html',
})
export class HealthVaultStressComponent {
	dtOptions: DataTables.Settings = {
	paging: false
};
  dtUsers =[
    {"id": 101, "firstName": "Taha", "lastName": "Chouhan", "email": "chouhantaha@live.com", "gender": "MALE", "age": "28", "city": "Daman"},
    {"id": 102, "firstName": "Nabeel", "lastName": "Bhavnagri", "email": "nbhavnagri@yahoo.com", "gender": "MALE", "age": "22", "city": "Ahmedabad"},
    {"id": 103, "firstName": "Nadeem", "lastName": "Khan", "email": "nadeem.khan@gmail.com", "gender": "MALE", "age": "20", "city": "Jogeshwari"},
    {"id": 104, "firstName": "Ahad", "lastName": "Khan", "email": "khanahad147@gmail.com", "gender": "MALE", "age": "20", "city": "Mumbra"},
    {"id": 105, "firstName": "Saylee", "lastName": "Ghadge", "email": "smilesyalee@gmail.com", "gender": "FEMALE", "age": "26", "city": "Borivali"},
    {"id": 106, "firstName": "Varsha", "lastName": "Shah", "email": "principal@rizvi.edu.in", "gender": "FEMALE", "age": "48", "city": "Bandra"},
    {"id": 107, "firstName": "Anas", "lastName": "Shaikh", "email": "luvuzeehan@yahoo.co.in", "gender": "MALE", "age": "18", "city": "Kurla"},
    {"id": 108, "firstName": "Arsh", "lastName": "Bhalla", "email": "stararshbhalla@gmail.com", "gender": "MALE", "age": "18", "city": "Ludhiyana"},
    {"id": 109, "firstName": "Riyaz", "lastName": "Khan", "email": "riyazkhanforu@gmail.com", "gender": "MALE", "age": "20", "city": "Chandni Chowk"},
    {"id": 110, "firstName": "Amaan", "lastName": "Merchant", "email": "merchantamaan2001@gmail.com", "gender": "MALE", "age": "19", "city": "Jogeshwari"},
    {"id": 201, "firstName": "Matt","lastName": "Meckenley", "email": "mattmeckenley@outlook.com", "gender": "MALE", "age": "25", "city": "New York"},
    {"id": 202, "firstName": "Ismail","lastName": "Ajmeri", "email": "ajmeriboy@gmail.com", "gender": "MALE", "age": "27", "city": "Thane"},
    {"id": 203, "firstName": "Rahil","lastName": "Shaikh", "email": "biker.rahil@gmail.com", "gender": "MALE", "age": "22", "city": "Andheri"},
    {"id": 204, "firstName": "Zaid","lastName": "Chunawala", "email": "chunawalazaid@yahoo.com", "gender": "MALE", "age": "18", "city": "Palampur"},
    {"id": 205, "firstName": "Saad","lastName": "Pathan", "email": "saadjada@gmail.com", "gender": "MALE", "age": "19", "city": "Rampur"},
    {"id": 206, "firstName": "Waseem","lastName": "Ansari", "email": "waseemwdd0142@gmail.com", "gender": "MALE", "age": "29", "city": "Malegaon"},
    {"id": 207, "firstName": "Usmangani","lastName": "Mansuri", "email": "usmanganimansuri@gmail.com", "gender": "MALE", "age": "18", "city": "Behrumbaug"},
    {"id": 208, "firstName": "Kashan","lastName": "Mansuri", "email": "kashan.khan@yahoo.co.in", "gender": "MALE", "age": "15", "city": "Matunga"}
  ];
}
