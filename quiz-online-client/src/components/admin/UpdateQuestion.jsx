import React, { useEffect, useState } from "react"
import { getQuestionById, updateQuestion } from "../../services/QuizService"
import { ArrowLeft, Save, Loader2 } from "lucide-react"

const UpdateQuestion = ({ questionId, onBack, onSuccess }) => {
	const [question, setQuestion] = useState("")
	const [questionType, setQuestionType] = useState("")
	const [choices, setChoices] = useState([""])
	const [correctAnswers, setCorrectAnswers] = useState("")
	const [subject, setSubject] = useState("")
	const [isLoading, setIsLoading] = useState(true)
	const [isUpdating, setIsUpdating] = useState(false)
	const [message, setMessage] = useState("")
	const [messageType, setMessageType] = useState("")

	useEffect(() => {
		if (questionId) {
			fetchQuestion()
		}
	}, [questionId])

	const fetchQuestion = async () => {
		try {
			setIsLoading(true)
			const questionToUpdate = await getQuestionById(questionId)
			if (questionToUpdate) {
				setQuestion(questionToUpdate.question)
				setQuestionType(questionToUpdate.questionType)
				setChoices(questionToUpdate.choices)
				setCorrectAnswers(questionToUpdate.correctAnswers.join(", "))
				setSubject(questionToUpdate.subject)
			}
			setIsLoading(false)
		} catch (error) {
			console.error(error)
			setMessage("Failed to load question: " + (error.message || "Unknown error"))
			setMessageType("error")
			setIsLoading(false)
		}
	}

	const handleQuestionChange = (e) => {
		setQuestion(e.target.value)
	}

	const handleQuestionTypeChange = (e) => {
		setQuestionType(e.target.value)
	}

	const handleChoiceChange = (index, e) => {
		const updatedChoices = [...choices]
		updatedChoices[index] = e.target.value
		setChoices(updatedChoices)
	}

	const handleCorrectAnswerChange = (e) => {
		setCorrectAnswers(e.target.value)
	}

	const handleSubjectChange = (e) => {
		setSubject(e.target.value)
	}

	const handleAddChoice = () => {
		setChoices([...choices, ""])
	}

	const handleRemoveChoice = (index) => {
		if (choices.length > 2) {
			const updatedChoices = choices.filter((_, i) => i !== index)
			setChoices(updatedChoices)
		}
	}

	const handleUpdate = async (e) => {
		e.preventDefault()
		
		// Validation
		if (!question.trim()) {
			setMessage("Please enter a question")
			setMessageType("error")
			return
		}
		
		if (!questionType) {
			setMessage("Please select a question type")
			setMessageType("error")
			return
		}
		
		if (!subject.trim()) {
			setMessage("Please enter a subject")
			setMessageType("error")
			return
		}
		
		if (choices.some(choice => !choice.trim())) {
			setMessage("All choices must have values")
			setMessageType("error")
			return
		}
		
		if (!correctAnswers.trim()) {
			setMessage("Please enter correct answer(s)")
			setMessageType("error")
			return
		}

		try {
			setIsUpdating(true)
			setMessage("")
			
			const updatedQuestion = {
				question,
				questionType,
				subject,
				choices,
				correctAnswers: correctAnswers
					.toString()
					.split(",")
					.map((answer) => answer.trim())
			}
			
			await updateQuestion(questionId, updatedQuestion)
			setMessage("Question updated successfully!")
			setMessageType("success")
			
			// Call onSuccess callback after a short delay
			setTimeout(() => {
				if (onSuccess) {
					onSuccess()
				}
			}, 1500)
		} catch (error) {
			console.error(error)
			setMessage("Failed to update question: " + (error.message || "Unknown error"))
			setMessageType("error")
		} finally {
			setIsUpdating(false)
		}
	}

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
					<p className="text-purple-300 text-lg">Loading question...</p>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen py-12 px-4">
			<div className="max-w-4xl mx-auto">
				<div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-purple-500/20 p-8 shadow-2xl">
					<div className="flex items-center justify-between mb-8">
						<div>
							<h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
								Update Quiz Question
							</h2>
							<p className="text-gray-400">Edit and update your quiz question</p>
						</div>
						<button
							onClick={onBack}
							className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-purple-400 rounded-lg transition-colors border border-purple-500/20"
						>
							<ArrowLeft size={20} />
							Back
						</button>
					</div>

					{message && (
						<div className={`mb-6 p-4 rounded-lg ${
							messageType === 'success' 
								? 'bg-green-500/10 text-green-400 border border-green-500/20' 
								: 'bg-red-500/10 text-red-400 border border-red-500/20'
						}`}>
							{message}
						</div>
					)}

					<form onSubmit={handleUpdate} className="space-y-6">
						<div>
							<label className="block text-purple-300 font-semibold mb-2">
								Question <span className="text-red-400">*</span>
							</label>
							<textarea
								className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
								rows={4}
								value={question}
								onChange={handleQuestionChange}
								placeholder="Enter your question here..."
								required
							/>
						</div>

						<div>
							<label className="block text-purple-300 font-semibold mb-2">
								Question Type <span className="text-red-400">*</span>
							</label>
							<select
								className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg p-4 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
								value={questionType}
								onChange={handleQuestionTypeChange}
								required
							>
								<option value="">Select question type</option>
								<option value="single">Single Choice</option>
								<option value="multiple">Multiple Choice</option>
							</select>
						</div>

						<div>
							<label className="block text-purple-300 font-semibold mb-2">
								Subject <span className="text-red-400">*</span>
							</label>
							<input
								type="text"
								className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
								value={subject}
								onChange={handleSubjectChange}
								placeholder="e.g., Network Security, Cryptography"
								required
							/>
						</div>

						<div>
							<label className="block text-purple-300 font-semibold mb-2">
								Answer Choices <span className="text-red-400">*</span>
							</label>
							<div className="space-y-3">
								{choices.map((choice, index) => (
									<div key={index} className="flex gap-2">
										<input
											type="text"
											className="flex-1 bg-slate-900/50 border border-purple-500/30 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
											value={choice}
											onChange={(e) => handleChoiceChange(index, e)}
											placeholder={`Choice ${index + 1}`}
											required
										/>
										{choices.length > 2 && (
											<button
												type="button"
												onClick={() => handleRemoveChoice(index)}
												className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors border border-red-500/30"
											>
												Remove
											</button>
										)}
									</div>
								))}
							</div>
							<button
								type="button"
								onClick={handleAddChoice}
								className="w-full mt-3 py-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-colors border border-purple-500/30 font-semibold"
							>
								+ Add Choice
							</button>
						</div>

						<div>
							<label className="block text-purple-300 font-semibold mb-2">
								Correct Answer(s) <span className="text-red-400">*</span>
							</label>
							<input
								type="text"
								className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
								value={correctAnswers}
								onChange={handleCorrectAnswerChange}
								placeholder="For multiple answers, separate with commas (e.g., A, C)"
								required
							/>
							<p className="text-sm text-gray-500 mt-2">
								Enter the exact text of correct answer(s), separated by commas
							</p>
						</div>

						<div className="flex gap-4 pt-6">
							<button
								type="submit"
								disabled={isUpdating}
								className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-bold rounded-lg transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isUpdating ? (
									<>
										<Loader2 className="animate-spin" size={20} />
										Updating...
									</>
								) : (
									<>
										<Save size={20} />
										Update Question
									</>
								)}
							</button>
							<button
								type="button"
								onClick={onBack}
								className="px-6 py-4 bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 font-semibold rounded-lg transition-colors border border-purple-500/20"
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default UpdateQuestion
