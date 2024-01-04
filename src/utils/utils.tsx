export function formatPokemonName(name:string): string {
  const lowerCase = name.toLowerCase()
  if (name.includes("♀")) {
    return lowerCase.replace("♀", "-f");
  } else if (lowerCase.includes("♂")) {
    return lowerCase.replace("♂", "-m");
  } else if (lowerCase.includes(". ")) {
    return lowerCase.replace(". ", "-");
  } else if (lowerCase.includes("farfetch'd")) {
    return lowerCase.replace("farfetch'd", "farfetchd");
  } 
  else {
    return lowerCase;
  }
}


export function waitFor(time:number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time))
}