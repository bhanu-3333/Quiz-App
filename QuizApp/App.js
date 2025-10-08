import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const questions = [
  {
    question: "Which of the following is used to declare a variable in JavaScript?",
    options: ["var", "let", "const", "All of the above"],
    answer: "All of the above",
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
      "Hyper Tool Multi Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Which property is used to change the background color in CSS?",
    options: ["color", "bgcolor", "background-color", "font-color"],
    answer: "background-color",
  },
  {
    question: "Which method is used to add an element at the end of an array in JavaScript?",
    options: [".push()", ".pop()", ".shift()", ".unshift()"],
    answer: ".push()",
  },
  {
    question: "Which HTML tag is used to include an external CSS file?",
    options: ["<style>", "<link>", "<css>", "<script>"],
    answer: "<link>",
  },
  {
    question: "How do you write a comment in JavaScript?",
    options: ["// This is a comment", "<!-- Comment -->", "/* Comment */", "Both // and /* */"],
    answer: "Both // and /* */",
  },
  {
    question: "What is the default display property of a <div> element in CSS?",
    options: ["inline", "block", "flex", "grid"],
    answer: "block",
  },
  {
    question: "Which event occurs when a user clicks on an HTML element?",
    options: ["onmouseover", "onchange", "onclick", "oninput"],
    answer: "onclick",
  },
  {
    question: "Which of these is a valid way to declare a function in JavaScript?",
    options: [
      "function myFunc() {}",
      "const myFunc = () => {}",
      "let myFunc = function() {}",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: "font-size",
  },
];


// Reusable Option Button
const OptionButton = ({ option, onPress }) => (
  <TouchableOpacity style={styles.optionButton} onPress={() => onPress(option)}>
    <Text style={styles.optionText}>{option}</Text>
  </TouchableOpacity>
);

// Home Screen
const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome to Quiz App</Text>
    <Button title="Start Quiz" onPress={() => navigation.navigate("Quiz")} />
  </View>
);

// Quiz Screen
const QuizScreen = ({ navigation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleOptionPress = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigation.navigate("Result", { score: score + (selectedOption === questions[currentQuestion].answer ? 1 : 0) });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{questions[currentQuestion].question}</Text>
      {questions[currentQuestion].options.map((option, index) => (
        <OptionButton key={index} option={option} onPress={handleOptionPress} />
      ))}
    </View>
  );
};

// Result Screen
const ResultScreen = ({ route, navigation }) => {
  const { score } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Score: {score}</Text>
      <Button title="Restart Quiz" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

// App Component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  question: { fontSize: 22, marginBottom: 20, textAlign: "center" },
  optionButton: {
    backgroundColor: "#3498db",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    width: "100%",
  },
  optionText: { color: "#fff", fontSize: 18, textAlign: "center" },
});
