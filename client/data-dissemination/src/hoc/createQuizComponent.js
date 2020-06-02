import BinaryQuestion from '../components/quizComponents/BinaryQuestion';
import LikertScaleQuestion from '../components/quizComponents/Likert';
import Finish from '../components/quizComponents/Finish';
import Information from '../components/quizComponents/Information';
import Video from '../components/quizComponents/Video';
import MultipleChoise from '../components/quizComponents/MultipleChoise';
import React from 'react';
import withProps from '../hoc/withProps';
import { Redirect } from 'react-router';

/*
Create mapping between type and Component to be rendered
*/
const mapTypeToComponent = {
  1: BinaryQuestion,
  2: LikertScaleQuestion,
  3: Video,
  4: Information,
  5: Finish,
  6: MultipleChoise
};


/*
HOC Component to Wrap question types for injecting type and 
add Modal for exiting quiz prematurely
*/
export function createQuizComponent(Quiz) {
  return class QuizHoc extends React.Component {
    render() {
      const redirectProps = {to: '/'}
      const contentData = this.props.quizIsLoaded ? this.props.quizData[this.props.quizIndex] : {}
      const contentProps = {onNext: this.props.incrementQuizIndex, key: this.props.quizIndex,  ...contentData, registerAnswer: this.props.registerAnswer}
      if (contentData.type === 5) contentProps.finishQuiz = this.props.finishQuiz
      const QuizContentType = this.props.quizIsLoaded ? withProps(contentProps, mapTypeToComponent[this.props.quizData[this.props.quizIndex].type]) : withProps(redirectProps, Redirect)
      return (
        <React.Fragment>
            <Quiz {...this.props}>
              <QuizContentType/> 
            </Quiz>
        </React.Fragment>
      );
    }
  };
}
