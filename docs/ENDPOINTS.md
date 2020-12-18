# PYBS Pages and Api Endpoints

## Pages

- **Authentication & Authorization**
  - Kullanıcı ekleme
    - **`[POST] [ADMIN] /auth/register`**
    
  - Kullanıcı silme
  - Giriş yapma
    - **`[GET] /auth/login`**
  - Aktif kullanıcı
    - **`[GET] /auth/active-user`**
- **Modüller**
  - Personel Modülü
    - ### Desktop :computer:
      - Personel listeleme
      **`[GET] ADMIN /personnels`**
        ```javascript 
        Response:
        {
          Name,
          Surname,
          Department,
          Duty
        } 
        ```
      - Personel oluşturma
      **`[POST] ADMIN /personnel`**
        ```javascript 
        Request:
        {
          Name,
          Surname,
          EmailAddress,
          Password,
          StartingDateOfEmployment,
          RoleId,
          GenderId
        }
        Response:
          201 Created
        ```
      - Personel detay
        **`[GET] ADMIN PERSONNEL /personnels/:personnelId`**
        ```javascript 
        Parameters:
        {
          personnelId
        }
        Response:
        {
          Personnel Object
        }
        ```
        **`[DELETE] ADMIN /personnels/:personnelId`**
        ```javascript 
        Parameters:
        {
          personnelId
        }
        Response:
          204 NoContent  
        ```
      - Personel düzenleme
        **`[PUT] /personnels/:personnelId`**
        ```javascript 
        Parameters:
        {
          personnelId
        }
        Request:
        {
          Personnel Object
        }
        Response:
          204 NoContent
        ```
  - İzin Modülü
    - ### Desktop :computer:
      - İzin tiplerini listeleme 
        **`[GET] ADMIN /leave-type`**
        ```javascript 
        Response:
          {
            LeaveName,
            isPaid,
            LimitName
          }
        ```
      - İzin tipi oluşturma 
        **`[POST] ADMIN /leave-type`**
        ```javascript 
        Request:
        {
          LeaveType Object
        }
        Response:
          201 Created
        ```
      - İzin tipi detay
        **`[GET] ADMIN /leave-type/:leaveTypeId`**
        ```javascript 
        Parameters:
        {
          leaveTypeId
        }
        Response:
        {
          LeaveType Object
        }
        ```
        **`[DELETE] ADMIN /leave-type/:leaveTypeId`**
        ```javascript 
        Parameters:
        {
          leaveTypeId
        }
        Response:
          204 NoContent
        ```
      - İzin tipi düzenleme
        **`[PUT] ADMIN /leave-type/:leaveTypeId`**
        ```javascript 
        Parameters:
        {
          leaveTypeId
        }
        Request:
        {
          LeaveType Object
        }
        Response:
          204 NoContent
        ```
      ---
      - İzin taleplerini listeleme
        **`[GET] ADMIN /leave-request`**
        ```javascript 
        Response:
        {
          LeaveRequestId,
          Name,
          Surname,
          LeaveTypeName,
          LeaveStartDate,
          LeaveFinishDate,
          StatusId,
          StatusName
        }
        ```
      - Personelin izinlerini listeleme
        **`[GET] ADMIN /leave-request-list/:personnelId`**
        ```javascript 
        Parameters:
        {
          personnelId
        }
        Response:
        {
          LeaveRequestId,
          Name,
          Surname,
          LeaveTypeName,
          LeaveStartDate,
          LeaveFinishDate,
          StatusId,
          StatusName
        }
        ```
      - İzin talep detay
        **`[GET] ADMIN /leave-request/detail/:leaveRequestId`**
        ```javascript 
        Parameters:
        {
          leaveRequestId
        }
        Response:
        {
          LeaveRequestId,
          Name,
          Surname,
          LeaveTypeName,
          isPaid,
          LeaveStartDate,
          LeaveFinishDate,
          StatusId,
          StatusName,
          createdAt
        }
        ```
        **`[POST] ADMIN /leave-request/status`**
        ```javascript 
        Request:
        {
          LeaveRequestId,
          StatusId
        }
        Response:
          200 OK
        ```
    - ### Mobile :iphone:
      - İzin talebi oluşturma
        **`[POST] PERSONNEL /leave-request`**
        ```javascript 
        Request:
        {
          PersonnelId,
          LeaveTypeId,
          LeaveStartDate,
          LeaveFinishDate,
        }
        Response:
          201 CREATED
        ```
      - İzin taleplerimi görüntüle
        **`[GET] PERSONNEL /leave-request-list/:personnelId`**
        ```javascript 
        Parameters:
        {
          personnelId
        }
        Response:
        { 
          LeaveRequestId,
          LeaveTypeName,
          LeaveStartDate,
          LeaveFinishDate,
          StatusId,
          StatusName
        }
        ```
      - İzin talebi detay
        **`[GET] PERSONNEL /leave-request/:leaveRequestId`**
        ```javascript 
        Parameters:
        {
          leaveRequestId
        }
        Response:
        {
          LeaveRequestId,
          LeaveTypeName,
          isPaid,
          LeaveStartDate,
          LeaveFinishDate,
          StatusId,
          StatusName,
          createdAt
        }
        ```
        **`[DELETE] PERSONNEL /leave-request/:leaveRequestId`**
        ```javascript 
        Parameters:
        {
          leaveRequestId
        }
        Response:
          204 NoContent
        ```
  - Eğitim Sayfası
  - Zimmet Sayfası
  - Duyuru Sayfası
  - Borç & Talep Sayfası
