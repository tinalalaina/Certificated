export const validateDiplomeRequest = (request) => {
    // Exemple de validation simple
    if (!request.nom || !request.prenom || !request.mention) {
      return { isValid: false, message: 'Tous les champs sont obligatoires.' };
    }
  
    // Exemple de vérification d'éligibilité
    const isEligible = true; // Remplacez par votre logique de vérification
    if (!isEligible) {
      return { isValid: false, message: 'Le demandeur n\'est pas éligible pour recevoir le diplôme.' };
    }
  
    return { isValid: true, message: '' };
  };