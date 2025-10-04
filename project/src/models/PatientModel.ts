export interface PatientData {
  age: number;
  gender: 'male' | 'female' | 'other';
  weight: number;
  height: number;
  familyHistory: boolean;
  smokingStatus: 'never' | 'former' | 'current';
  alcoholConsumption: 'none' | 'moderate' | 'high';
  physicalActivity: 'sedentary' | 'moderate' | 'active';
  previousCancerDiagnosis: boolean;
}

export interface PredictionResult {
  riskPercentage: number;
  riskLevel: 'low' | 'moderate' | 'high' | 'very-high';
  clinicalMessage: string;
  recommendations: string[];
}

export class PatientModel {
  private data: Partial<PatientData> = {};

  setData(data: Partial<PatientData>): void {
    this.data = { ...this.data, ...data };
  }

  getData(): Partial<PatientData> {
    return { ...this.data };
  }

  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.data.age || this.data.age < 0 || this.data.age > 120) {
      errors.push('Edad debe estar entre 0 y 120 años');
    }

    if (!this.data.gender) {
      errors.push('Género es requerido');
    }

    if (!this.data.weight || this.data.weight < 1 || this.data.weight > 500) {
      errors.push('Peso debe estar entre 1 y 500 kg');
    }

    if (!this.data.height || this.data.height < 50 || this.data.height > 300) {
      errors.push('Altura debe estar entre 50 y 300 cm');
    }

    if (this.data.familyHistory === undefined) {
      errors.push('Historial familiar es requerido');
    }

    if (!this.data.smokingStatus) {
      errors.push('Estado de fumador es requerido');
    }

    if (!this.data.alcoholConsumption) {
      errors.push('Consumo de alcohol es requerido');
    }

    if (!this.data.physicalActivity) {
      errors.push('Actividad física es requerida');
    }

    if (this.data.previousCancerDiagnosis === undefined) {
      errors.push('Diagnóstico previo de cáncer es requerido');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  toJSON(): PatientData {
    return this.data as PatientData;
  }

  reset(): void {
    this.data = {};
  }
}
