# PYBS Dokümantasyonu

## Modüller

- Profil (Profile)
- İzin (Leave)
- Duyuru
- Eğitim (Training)
- Zimmet (Asset)
- Borç & Talep

### Profil

Personelin temel bilgilerinin görüntülendiği yerdir. Personel bilgileri buradan güncellenebilir.

```csharp
class Role {
    int Id;
    string Name;
}

class UserRole {
    int Id;
    int RoleId;
    int UserId;
}

class Account {
    string EmailAddress;
    string Password;
}

class MaritalStatus {
    int Id;
    string Name;
}

class Gender {
    int Id;
    string Name;
}

class BloodType {
    int Id;
    string Name;
}

class Province {
    int Id;
    string Name;
}

class District {
    int Id;
    int ProvinceId;
    string Name;
}

class Address {
    int Id;
    string Description;
    int ProvinceId;
    int DistrictId;
}

class Profile {
    string IdentityNumber;
    string Name;
    string Surname;
    DateTime Birthday;
    int BloodTypeId;
    int MaritalStatusId;
    int GenderId;
    int ChildCount;
    string Graduation;
    string GraduationDepartment;
    int AddressId;
    string PhoneNumber;
}

class Personnel {
    string PersonnelNumber;
    string BonusCode;
    bool IsWorking;
    string Division;
    string EmployerCompany;
    DateTime StartingDateOfEmployment;
    DateTime SGKFirstEntry;
    string Department;
    string Duty;
    string BCWC;
    string Status;
}

class TimeStamps {
    DateTime CreatedAt;
    DateTime UpdatedAt;
}

class User {
    int Id;
    Profile Profile;
    Personnel Personnel;
    Account Account;
    TimeStamps TimeStamps;
}
```

### İzin (Leave)

- Yetkili kişi izin tipleri oluşturur.
- Personel belli bir tipten ve süreden izin talep eder
- Yetkili talep edilen izinleri görüntüleyebilir, onaylayabilir veya reddedebilir

#### Sayfalar

- İzin tipi oluşturma
- İzin isteğinde bulunma
- İzin onay & ret ekranı
- İzin isteklerini görüntüleme

```csharp
class LeaveType{
    int Id;
    string LeaveTypeName;
    string Description;
    bool IsPaid;
    //int LimitTypeId;
    //limittypebased ↓
    string LimitName;
    int? Day;
    int? OverdrawnBalanceTypeId; // eksi bakiye
    int? AccrualFrequencyTypeId; // hak ediş sıklıgı
    int? StartDateTypeId; 
    int? CarryOverId; // devretme
    //int? SeniorityRightTypeId; // kıdem
    int? AtLeastDay;
    int? AtMostDay;
    int? WaitingPeriodMonth;
}

class OverdrawnBalance{ // eksi bakiye var-yok
    int Id;
    string Name;
    bool IsOverdrawn;
}
class AccrualFrequency{ // günlük, aylık, yıllık
    int Id;
    string Name;
    int Day;
}
class StartDate{ // işe başladığı zaman, yıl başı vs.
    int Id;
    string Name;
    DateTime? Date;
}
class CarryOver{ // kalan izin devretme
    int Id;
    string Name;
    bool IsCarryOver;
}
class SeniorityRight{ // Fazladan izin kazanma durumu
    int Id;
    int SeniorityYear;
    int AdditionalDays; 
}
class SeniorityRightLeaveTypes{
    int SeniorityRightId;
    int LeaveTypeId;
}
//
class LeaveRequest{
    int Id;
    int UserId;
    int LeaveTypeId;
    int LeaveStatusId;
    DateTime LeaveStartDate;
    DateTime LeaveFinishDate;
    TimeStamps TimeStamps;
}

class LeaveStatus{
    int Id;
    string Name;
}

class TimeStamps {
    DateTime CreatedAt;
    DateTime UpdatedAt;
}
```

### Zimmetler

- Zimmetleri yetkili oluşturur, düzenler, siler, personele atar ve iade alır
- Zimmet kategorilerini yetkili oluşturur, düzenler ve siler
- Zimmetler süreli veya süresiz verilebilir
- Zimmet fişi oluşturulabilir

#### Sayfalar

- Zimmetler
- Zimmet ekleme
- Zimmet düzenleme
- Zimmet silme
- Zimmet atama
- Zimmet kategorileri
- Zimmet kategorisi ekleme
- Zimmet kategorisi silme
- Zimmet kategorisi düzenleme

```csharp
class AssetPersonnel {
    int PersonnelId;
    int AssetId;
    DateTime GivenDate;
    DateTime ReturnDate;
    bool IsReturned;
    TimeStamps TimeStamps;
}

class Asset {
    int Id;
    int AssetCategoryId;
    string SerialNumber;
    string Description;
    TimeStamps TimeStamps;
}

class AssetCategory {
    int Id;
    string Name;
    TimeStamps TimeStamps;
}

class TimeStamps {
    DateTime CreatedAt;
    DateTime UpdatedAt;
}
```

### Eğitim

- Eğitimi yetkili kişi oluşturacak
- Eğitimler yetkili kişi tarafından personele atanacak
- Personelin eğitimle ilgili problemi olduğunda, yetkili kişi eğitim durumunu güncelleyebilecek
- Eğitimlerin durumu sistem bir sorunla karşılaşmadığı sürece kendi otomatik gerçekleştirecektir

#### Sayfalar

- Eğitim oluştur.
- Eğitimleri listele.
- Eğitim atama.
- Eğitim durum güncellemesi.

```csharp
class Training {
    string TrainingName;
    DateTime StartDate;
    DateTime FinishDate;
    string Detail;
    string Location;
    string EducatingFirm;
    string Instructor;
}

class TrainingPersonnel {
    int TrainingId;
    int PersonnelId;
    int StatusId;
}

class TrainingStatus {
    int Id;
    int Name;
}
```
