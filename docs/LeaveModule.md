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