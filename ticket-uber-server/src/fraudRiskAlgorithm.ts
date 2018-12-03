/*
we moeten hebben van de ticket:
- het event + andere tickets;
- de author + andere tickets;
- de comments ervan;
*/

/// dit kan missch makkelijker door alles gewoon eagerly te laten loaden binnen ticket enzo zodat je het hele pakket in 1x kan sturen?
/// of nee beter: het gwn via een queryconstructor doen!
export default function updateFraudRisk(ticketId: number) {
  // als de fraudRisk field nog niet null is ga dan intelligent doen
  return fraudRiskAlgorithm;
}

function fraudRiskAlgorithm(ticketsOfAuthor: number, averagePrice: number, price: number, timeAdded: string, commentCount: number): number {
  let risk = 0;

  if (ticketsOfAuthor <= 1) risk += 10;

  const priceRisk: number = ((averagePrice - price) / averagePrice);
  risk += priceRisk < -10 ? priceRisk : -10;
  /// kijken of dat hier gewerkt heeft

  risk += timeDuringBusinessHours(timeAdded) ? -10 : 10;
  
  if (commentCount > 3) risk += 5;

  if (risk < 5) return 5;
  if (risk > 95) return 95;
  
  return risk;
}

/// moet hier nog kijken hoe het timeAdded geformat uit de database komt
function timeDuringBusinessHours(time: string): boolean {
  return true;
}