module.exports = type => {
  switch (type) {
    case "rating":
      return {
        reply_markup: {
          keyboard: [
            ["😍", "😃", "🙂", "😐", "🙁", "😫"],
            ["🤩", "😜", "🤑", "🤯", "😂", "😚"],
            ["🤨", "🙄", "🤐", "🤢", "🥵", "🥶"],
            ["👍", "👎", "🙌", "👌", "🖕", "💪"]
          ],
          resize_keyboard: true
        }
      }
    case "category":
      return {
        reply_markup: {
          keyboard: [
            ["🍔", "🍟", "🍕", "🥪", "🥙", "🌮", "🌯", "🍤"],
            ["🥗", "🍝", "🍜", "🍛", "🍲","🍣", "🥘", "🌭"],
            ["🧀", "🍳", "🥓", "🥩", "🍗", "🥟", "🍩", "🥡"],
            ["🍦", "🍰", "🥞", "🥐", "🍞", "🥨", "🥯", "🍫"],
            ["☕️", "🍵", "🍺", "🍷", "🍹", "🥃", "🥂", "🍶"]
          ],
          resize_keyboard: true
        }
      }
    case "recommendation":
      return {
        reply_markup: {
          keyboard: [
            ["Ort bewerten"],
            ["Anderer Vorschlag"],
            ["Andere Kategorie"] 
          ],
          resize_keyboard: true
        }
      }
    case "location":
      return {
        reply_markup: {
          keyboard: [[{ text: "Standort senden", request_location: true }]],
          resize_keyboard: true,
          one_time_keyboard: true
        }
      }
  }
}