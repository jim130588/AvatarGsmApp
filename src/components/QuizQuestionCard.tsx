import {View, Text, StyleSheet, Pressable} from 'react-native';

type QuizQuestionCardProps = {
    question: string;
    possibleAnsers: string[];
    selectedAnswer?: string;
    onSelectAnswer: (answer: string) => void;
}

const QuizQuestionCard = ({question, possibleAnsers, selectedAnswer, onSelectAnswer}: QuizQuestionCardProps) => {
    return (
        <View style={styles.card}>
            <Text style={styles.question}>{question}</Text>
            {possibleAnsers.map((answer) => {
                const isSelected = selectedAnswer === answer;
                return (
                    <Pressable
                        key={answer}
                        style={[styles.answerButton, isSelected && styles.selectedAnswer]}
                        onPress={() => onSelectAnswer(answer)}
                    >
                        <Text style={styles.answerText}>{answer}</Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

export default QuizQuestionCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  answerButton: {
    backgroundColor: '#e5e7eb',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  selectedAnswer: {
    borderWidth: 2,
    borderColor: '#111827',
  },
  answerText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
