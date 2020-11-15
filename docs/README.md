# PYBS Dokümantasyonu

## Modüller

-   Profil (Profile)
-   Yıllık izin (Annual Leave)
-   Duyuru
-   Eğitim
-   Zimmet
-   Borç & Talep

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
    string Username;
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

### Yıllık İzin (Annual Leave)

#### Ücretli İzin

-   Personeller işe girdikten tam bir yıl sonra yıllık izin hakkı kazanır
-   Kalan izin hakkı negatif olabilir (Avans)
-   Tatil günleri (pazar) ve özel günler izin hakkından düşülmez
-   Personeller izin kullanma talebinde bulunur. Bu talep yetkili kullanıcılar tarafından onaylanır

#### Ücretsiz İzin

-   Doğum izni
