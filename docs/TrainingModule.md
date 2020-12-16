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