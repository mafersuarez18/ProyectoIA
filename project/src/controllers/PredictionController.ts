import { PatientModel, PatientData, PredictionResult } from '../models/PatientModel';

export class PredictionController {
  private model: PatientModel;
  private apiEndpoint: string;
  
//Aca tendrian que cambiar para lo de la api
  constructor(apiEndpoint: string = '/api/predict') {
    this.model = new PatientModel();
    this.apiEndpoint = apiEndpoint;
  }

  updatePatientData(data: Partial<PatientData>): void {
    this.model.setData(data);
  }

  validateData(): { isValid: boolean; errors: string[] } {
    return this.model.validate();
  }

  async predictRisk(): Promise<PredictionResult> {
    const validation = this.model.validate();

    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    const patientData = this.model.toJSON();

    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      });

      if (!response.ok) {
        return this.simulatePrediction(patientData);
      }

      const result: PredictionResult = await response.json();
      return result;
    } catch (error) {
      return this.simulatePrediction(patientData);
    }
  }

  //logica para probar sin api + recomendaciones
  private simulatePrediction(data: PatientData): PredictionResult {
    let riskScore = 20;

    if (data.age > 50) riskScore += 15;
    if (data.age > 65) riskScore += 10;

    if (data.familyHistory) riskScore += 20;

    if (data.smokingStatus === 'current') riskScore += 25;
    else if (data.smokingStatus === 'former') riskScore += 10;

    if (data.alcoholConsumption === 'high') riskScore += 15;
    else if (data.alcoholConsumption === 'moderate') riskScore += 5;

    if (data.physicalActivity === 'sedentary') riskScore += 10;

    if (data.previousCancerDiagnosis) riskScore += 20;

    const bmi = data.weight / Math.pow(data.height / 100, 2);
    if (bmi > 30) riskScore += 10;
    else if (bmi > 25) riskScore += 5;

    riskScore = Math.min(Math.max(riskScore, 5), 95);

    let riskLevel: PredictionResult['riskLevel'];
    let clinicalMessage: string;
    let recommendations: string[];

    if (riskScore < 30) {
      riskLevel = 'low';
      clinicalMessage = 'Su riesgo de cáncer es bajo. Continúe con hábitos saludables y chequeos regulares.';
      recommendations = [
        'Mantenga una dieta equilibrada rica en frutas y verduras',
        'Realice ejercicio regularmente (150 minutos semanales)',
        'Realice chequeos médicos anuales',
      ];
    } else if (riskScore < 50) {
      riskLevel = 'moderate';
      clinicalMessage = 'Su riesgo de cáncer es moderado. Se recomienda adoptar medidas preventivas.';
      recommendations = [
        'Consulte con su médico sobre estrategias de prevención',
        'Realice exámenes de detección según su edad y factores de riesgo',
        'Mejore sus hábitos de vida: ejercicio, alimentación, evite tabaco y alcohol',
        'Considere evaluación genética si tiene historial familiar',
      ];
    } else if (riskScore < 70) {
      riskLevel = 'high';
      clinicalMessage = 'Su riesgo de cáncer es alto. Se requiere evaluación médica y seguimiento cercano.';
      recommendations = [
        'Programe una consulta médica urgente con un oncólogo',
        'Realice exámenes de detección completos inmediatamente',
        'Implemente cambios significativos en estilo de vida',
        'Considere programas de vigilancia intensiva',
        'Evalúe opciones de quimioprevención con su médico',
      ];
    } else {
      riskLevel = 'very-high';
      clinicalMessage = 'Su riesgo de cáncer es muy alto. Se requiere atención médica inmediata.';
      recommendations = [
        'URGENTE: Consulte con un oncólogo en las próximas 48 horas',
        'Realice exámenes diagnósticos completos de inmediato',
        'Discuta estrategias de prevención agresivas con su médico',
        'Considere participar en programas de detección temprana',
        'Evalúe todas las opciones preventivas disponibles',
      ];
    }

    return {
      riskPercentage: Math.round(riskScore),
      riskLevel,
      clinicalMessage,
      recommendations,
    };
  }

  resetModel(): void {
    this.model.reset();
  }

  getModelData(): Partial<PatientData> {
    return this.model.getData();
  }
}
