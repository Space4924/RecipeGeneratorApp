

    export const GENERATE_OPTION_PROMPT= `Depends on user instruction create 3 different Recipe variant with Recipe Name with Emoji,
    2 line description and main ingredient list in JSON format with field recipeName, description, ingredients (without size) Respond with only the raw JSON`

    export const GENERATE_COMPLETE_RECIPE= `As per recipe Name and Description,
     Give me all list of ingredients as ingredient, emoji icons for each ingredient as icon, quantity as quantity,
      along with detail step by step recipe as steps Total Calories as calories (only number),
       Minutes to cook as cookTime and serving number as serve To relastic image Text prompt as per
        reciepe as imagePrompt
         Respond with only the raw JSON`
