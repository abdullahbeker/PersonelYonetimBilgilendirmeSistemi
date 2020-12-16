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