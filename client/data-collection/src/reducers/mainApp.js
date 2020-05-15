const mainAppReducer = (state = {}, action) => {
  switch (action.type) {
    case "CHANGE_QUESTION":
      return {
        ...state,
        questionIndex: action.questionIndex,
      };
    case "DATA_IS_LOADED":
      console.log(action.questions);
      action.questions = {
        questions: [
          {
            type: 4,
            title: "We will first get to know each other!",
          },
          {
            type: 1,
            title: "Which one is a keyboard?",
            text: "Only one of them is a keyboard...",
            image1:
              "https://i.imgur.com/9GIFW9f.jpg",
            image2:
              "https://i.imgur.com/9GIFW9f.jpg",
          },
          {
            type: 1,
            title: "Which one is Donald Duck?",
            text: "",
            image1:
              "https://s12emagst.akamaized.net/products/2427/2426628/images/res_ec174d50b8395d32dfa933a7fa538e5d_full.jpg",
            image2:
              "https://www.ixxiyourworld.com/media/1676571/Mickey-Mouse-2.jpg?mode=crop&width=562&height=613",
          },
          {
            type: 2,
            title: "Question 2",
            text: "How much do you like pizza?",
            image:
              "https://i.imgur.com/9GIFW9f.jpg",
          },
          {
            type: 3,
            title: "Watch the following video",
            videoId: "7CVtTOpgSyY",
          },
          {
            type: 6,
            title: "Multiple Choice"
          },
          {
            type: 5,
            title: "THE QUIZ HAS ENDED!",
          }
        ],
      };
      return {
        ...state,
        questions: action.questions,
        isDataLoaded: true,
      };
    case "FINISH_QUIZ":
      return {
        ...state,
        questionIndex: 0,
      };
    default:
      return state;
  }
};

export default mainAppReducer;
