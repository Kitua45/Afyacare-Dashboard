/* ============================
   DATABASE: Patient Health Tracking
   ============================ */

CREATE DATABASE HealthTrackDB;
GO
USE HealthTrackDB;
GO

/* ============================
   PATIENTS
   Age is computed from DateOfBirth
   ============================ */
CREATE TABLE Patients (
    PatientID INT IDENTITY(1,1) PRIMARY KEY,
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    Gender NVARCHAR(10),
    DateOfBirth DATE NOT NULL,

    Age AS (
        DATEDIFF(YEAR, DateOfBirth, GETDATE()) -
        CASE 
            WHEN DATEADD(YEAR, DATEDIFF(YEAR, DateOfBirth, GETDATE()), DateOfBirth) > GETDATE()
            THEN 1 ELSE 0
        END
    ),

    PhoneNumber NVARCHAR(20),
    CreatedAt DATETIME2 DEFAULT GETDATE()
);

/* ============================
   MEDICAL CONDITIONS
   ============================ */
CREATE TABLE Conditions (
    ConditionID INT IDENTITY(1,1) PRIMARY KEY,
    ConditionName NVARCHAR(50) UNIQUE NOT NULL
);

/* ============================
   PATIENT CONDITION RELATION
   Supports one, both, or none
   ============================ */
CREATE TABLE PatientConditions (
    PatientConditionID INT IDENTITY(1,1) PRIMARY KEY,
    PatientID INT NOT NULL,
    ConditionID INT NOT NULL,

    CONSTRAINT FK_PC_Patient
        FOREIGN KEY (PatientID) REFERENCES Patients(PatientID),

    CONSTRAINT FK_PC_Condition
        FOREIGN KEY (ConditionID) REFERENCES Conditions(ConditionID),

    CONSTRAINT UQ_Patient_Condition
        UNIQUE (PatientID, ConditionID)
);

/* ============================
   VITAL TYPES
   ============================ */
CREATE TABLE VitalTypes (
    VitalTypeID INT IDENTITY(1,1) PRIMARY KEY,
    VitalName NVARCHAR(50) NOT NULL,
    Unit NVARCHAR(20) NOT NULL
);

CREATE TABLE VitalRanges (
    RangeID INT IDENTITY(1,1) PRIMARY KEY,
    VitalTypeID INT NOT NULL,
    NormalMin DECIMAL(5,2),
    NormalMax DECIMAL(5,2),
    WarningMin DECIMAL(5,2),
    WarningMax DECIMAL(5,2),

    CONSTRAINT FK_VitalRanges_VitalType
        FOREIGN KEY (VitalTypeID) REFERENCES VitalTypes(VitalTypeID)
);

CREATE TABLE VitalRecords (
    VitalRecordID INT IDENTITY(1,1) PRIMARY KEY,
    PatientID INT NOT NULL,
    VitalTypeID INT NOT NULL,
    VitalValue DECIMAL(5,2) NOT NULL,
    RecordedAt DATETIME2 DEFAULT GETDATE(),

    CONSTRAINT FK_VitalRecords_Patient
        FOREIGN KEY (PatientID) REFERENCES Patients(PatientID),

    CONSTRAINT FK_VitalRecords_VitalType
        FOREIGN KEY (VitalTypeID) REFERENCES VitalTypes(VitalTypeID)
);


/* ============================
   MEDICATIONS
   ============================ */
CREATE TABLE Medications (
    MedicationID INT IDENTITY(1,1) PRIMARY KEY,
    MedicationName NVARCHAR(100) NOT NULL,
    Purpose NVARCHAR(100)
);

/* ============================
   PATIENT MEDICATION SCHEDULE
   ============================ */
CREATE TABLE PatientMedications (
    PatientMedicationID INT IDENTITY(1,1) PRIMARY KEY,
    PatientID INT NOT NULL,
    MedicationID INT NOT NULL,
    Dosage NVARCHAR(50),
    TimeToTake TIME NOT NULL,

    CONSTRAINT FK_PM_Patient
        FOREIGN KEY (PatientID) REFERENCES Patients(PatientID),

    CONSTRAINT FK_PM_Medication
        FOREIGN KEY (MedicationID) REFERENCES Medications(MedicationID)
);

/* ============================
   MEDICATION INTAKE LOG
   ============================ */
CREATE TABLE MedicationLogs (
    MedicationLogID INT IDENTITY(1,1) PRIMARY KEY,
    PatientMedicationID INT NOT NULL,
    Taken BIT DEFAULT 0,
    TakenAt DATETIME2,

    CONSTRAINT FK_ML_PatientMedication
        FOREIGN KEY (PatientMedicationID)
        REFERENCES PatientMedications(PatientMedicationID)
);
