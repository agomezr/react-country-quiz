  export function getRandomArrayElement<T>(arr: T[]): T | undefined {
    if (arr.length === 0) {
      return undefined; 
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  /*
    allOptions: array of al string options
    toDelete: the string or option that must be excluded of the result
    amount: the length of the returned array
  */
  export function getOptions(allOptions:string[], toDelete:string, amount:number = 3):string[]{
    const options:string[] = [];
    do {
      const randomIndex = Math.floor(Math.random() * allOptions.length);
      if (!options.includes(allOptions[randomIndex]) && allOptions[randomIndex] !== toDelete){
        options.push(allOptions[randomIndex]);
      }
    } while (options.length < amount);
    return options;
  }

  export function shuffleArray(arr:string[]):string[] {
    const shuffleResult = [...arr];
    for (let i = shuffleResult.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffleResult[i], shuffleResult[j]] = [shuffleResult[j], shuffleResult[i]];
    }
    return shuffleResult;
  }