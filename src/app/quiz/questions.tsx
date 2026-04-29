import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, ActivityIndicator, Alert} from 'react-native';
import { router, Stack } from 'expo-router';
import QuizQuestionCard from '../../components/QuizQuestionCard';

type QuizQuestion = {
    id: number;
    question: string;
    possibleAnsers: string[];
    correctAnswer: string;
    selectedAnswer?: string;
}

const QuestionsScreen = () => {
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadQuestions();
    }, []);

    const shuffleArray = <T,>(array: T[]) => {
        const copy = [...array];

        for (let i = copy.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
        }
        return copy;
    }

    const loadQuestions = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://sampleapis.assimilate.be/avatar/questions');
            const data: QuizQuestion[] = await response.json();

            const randomQuestions = shuffleArray(data).slice(0, 10);

            setQuestions(randomQuestions);
            setStartTime(Date.now());
        } catch (error) {
            console.error('Fout bij laden vragen:', error);
            Alert.alert('Fout', 'Vragen konden niet geladen worden.');
        } finally {
            setLoading(false);
        }
    };

    const selectAnswer = (answer: string) => {
        const updatedQuestions = [...questions];

        updatedQuestions[currentIndex] = {
            ...updatedQuestions[currentIndex],
            selectedAnswer: answer,
        };

        setQuestions(updatedQuestions);
    };

    const goToNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const goPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const finishQuiz = () => {
    if (!startTime) return;

    const unansweredQuestions = questions.filter((question) => !question.selectedAnswer);

    if (unansweredQuestions.length > 0) {
      Alert.alert(
        'Nog niet klaar',
        `Je hebt nog ${unansweredQuestions.length} vraag/vragen niet beantwoord.`
      );
      return;
    }

    const endTime = Date.now();
    const timeInSeconds = Math.floor((endTime - startTime) / 1000);

    const score = questions.filter(
      (question) => question.selectedAnswer === question.correctAnswer
    ).length;

    router.push({
      pathname: '/scoreboard',
      params: {
      score: String(score),
      totalQuestions: String(questions.length),
      timeInSeconds: String(timeInSeconds),
      justPlayed: 'true',
      },
    });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Quiz vragen', headerTitleAlign: 'center' }} />

      <Text style={styles.progress}>
        Vraag {currentIndex + 1} van {questions.length}
      </Text>

      <QuizQuestionCard
            question={currentQuestion.question}
            possibleAnsers={currentQuestion.possibleAnsers}
            selectedAnswer={currentQuestion.selectedAnswer}
            onSelectAnswer={selectAnswer}       
        />

      <View style={styles.navigation}>
        <Pressable
          style={[styles.navButton, currentIndex === 0 && styles.disabledButton]}
          onPress={goPrevious}
          disabled={currentIndex === 0}
        >
          <Text style={styles.navButtonText}>Vorige</Text>
        </Pressable>

        {currentIndex === questions.length - 1 ? (
          <Pressable style={styles.navButton} onPress={finishQuiz}>
            <Text style={styles.navButtonText}>Finish</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.navButton} onPress={goToNext}>
            <Text style={styles.navButtonText}>Volgende</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default QuestionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#ffffff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
  },
  navigation: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    backgroundColor: '#111827',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
  navButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});