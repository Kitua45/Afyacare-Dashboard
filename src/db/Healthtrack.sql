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
GO

/* ============================
   MEDICAL CONDITIONS
   ============================ */
CREATE TABLE Conditions (
    ConditionID INT IDENTITY(1,1) PRIMARY KEY,
    ConditionName NVARCHAR(50) UNIQUE NOT NULL
);
GO

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
GO

/* ============================
   VITAL TYPES
   ============================ */
CREATE TABLE VitalTypes (
    VitalTypeID INT IDENTITY(1,1) PRIMARY KEY,
    VitalName NVARCHAR(50) NOT NULL,
    Unit NVARCHAR(20) NOT NULL
);
GO

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
GO

/* ============================
   VITAL RECORDS
   ============================ */
CREATE TABLE VitalRecords (
    VitalRecordID INT IDENTITY(1,1) PRIMARY KEY,
    PatientID INT NOT NULL,
    VitalTypeID INT NOT NULL,
    VitalValue DECIMAL(5,2) NOT NULL,
    RecordedAt DATETIME2 DEFAULT GETDATE(),

    -- Columns for automated severity and recommendation
    Severity NVARCHAR(20),
    SeverityColor NVARCHAR(10),
    Recommendation NVARCHAR(150),

    CONSTRAINT FK_VitalRecords_Patient
        FOREIGN KEY (PatientID) REFERENCES Patients(PatientID),

    CONSTRAINT FK_VitalRecords_VitalType
        FOREIGN KEY (VitalTypeID) REFERENCES VitalTypes(VitalTypeID)
);
GO

/* ============================
   MEDICATIONS
   ============================ */
CREATE TABLE Medications (
    MedicationID INT IDENTITY(1,1) PRIMARY KEY,
    MedicationName NVARCHAR(100) NOT NULL,
    Purpose NVARCHAR(100)
);
GO

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
GO

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
GO

/* ============================
   AUTO-SEVERITY & RECOMMENDATION TRIGGER
   ============================ */

/* Drop trigger if it already exists */
IF OBJECT_ID('trg_AutoVitalAssessment', 'TR') IS NOT NULL
    DROP TRIGGER trg_AutoVitalAssessment;
GO

CREATE TRIGGER trg_AutoVitalAssessment
ON VitalRecords
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE vr
    SET
        vr.Severity =
            CASE
                WHEN vr.VitalValue BETWEEN r.NormalMin AND r.NormalMax THEN 'Normal'
                WHEN vr.VitalValue BETWEEN r.WarningMin AND r.WarningMax THEN 'Warning'
                ELSE 'Critical'
            END,

        vr.SeverityColor =
            CASE
                WHEN vr.VitalValue BETWEEN r.NormalMin AND r.NormalMax THEN 'Green'
                WHEN vr.VitalValue BETWEEN r.WarningMin AND r.WarningMax THEN 'Orange'
                ELSE 'Red'
            END,

        vr.Recommendation =
            CASE
                WHEN vr.VitalValue BETWEEN r.NormalMin AND r.NormalMax
                    THEN 'All good. Continue monitoring.'
                WHEN vr.VitalValue BETWEEN r.WarningMin AND r.WarningMax
                    THEN 'Monitor closely and consider seeing a doctor.'
                ELSE
                    'Seek medical attention immediately.'
            END
    FROM VitalRecords vr
    INNER JOIN inserted i
        ON vr.VitalRecordID = i.VitalRecordID
    INNER JOIN VitalRanges r
        ON vr.VitalTypeID = r.VitalTypeID;
END;
GO


/* ============================
   TEST QUERY
   ============================ */
SELECT * FROM Patients;
