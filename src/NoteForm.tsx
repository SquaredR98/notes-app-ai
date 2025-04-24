import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CiCirclePlus } from 'react-icons/ci';
import { MdSave } from 'react-icons/md';
import {
	summarizeWithOpenRouter,
	summarizeWithDeepAI,
	sentimentWithHuggingFace,
	generateTitleFromContent,
} from './lib/ai';

export type Note = {
	id: string;
	title: string;
	content: string;
	summary?: string;
	mood?: string;
};

type Props = {
	selectedNote?: Note;
	setSelectedNote?: (data: Note | undefined) => void;
	setEditOrCreateNote?: (data: boolean) => void;
};

const NoteForm: React.FC<Props> = ({
	selectedNote,
	setEditOrCreateNote,
	setSelectedNote,
}) => {
	const [aiSummary, setAiSummary] = useState('');
	const [summarizing, setSummarizing] = useState(false);
	const [moodEmoji, setMoodEmoji] = useState('');

	const { register, handleSubmit, reset, setValue, watch } = useForm<
		Omit<Note, 'id'>
	>({
		defaultValues: selectedNote
			? { title: selectedNote.title, content: selectedNote.content }
			: { title: '', content: '' },
	});

	const content = watch('content');

	useEffect(() => {
		if (selectedNote) {
			setValue('title', selectedNote.title);
			setValue('content', selectedNote.content);
			setAiSummary(selectedNote.summary || '');
			setMoodEmoji(selectedNote.mood || '');
		} else {
			reset({ title: '', content: '' });
			setAiSummary('');
			setMoodEmoji('');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedNote]);

	const handleSummarize = async () => {
		setSummarizing(true);
		if (!content || content.length < 10) {
			alert('Please write more content to generate a summary.');
			return;
		}

		try {
			const summary = await summarizeWithOpenRouter(content);
			const mood = await sentimentWithHuggingFace(content);
			setAiSummary(summary);
			setMoodEmoji(mood);

			if (selectedNote) {
				const existing: Note[] = JSON.parse(
					localStorage.getItem('notes') || '[]',
				);
				const updated = existing.map((note) =>
					note.id === selectedNote.id
						? { ...note, summary, mood }
						: note,
				);
				localStorage.setItem('notes', JSON.stringify(updated));
			}
		} catch {
			const fallbackSummary = await summarizeWithDeepAI(content);
			setAiSummary(fallbackSummary);
			setMoodEmoji('😐');

			if (selectedNote) {
				const existing: Note[] = JSON.parse(
					localStorage.getItem('notes') || '[]',
				);
				const updated = existing.map((note) =>
					note.id === selectedNote.id
						? {
								...note,
								summary: fallbackSummary,
								mood: '😐',
						  }
						: note,
				);
				localStorage.setItem('notes', JSON.stringify(updated));
			}
		}
		setSummarizing(false);
	};

	const onSubmit = async (data: Omit<Note, 'id'>) => {
		// eslint-disable-next-line prefer-const
		let { title, content } = data;

		if (!title.trim()) {
			title = await generateTitleFromContent(content);
			setValue('title', title);
		}

		const existing: Note[] = JSON.parse(
			localStorage.getItem('notes') || '[]',
		);

		if (selectedNote) {
			const updated = existing.map((note) =>
				note.id === selectedNote.id
					? {
							...note,
							title,
							content,
							summary: aiSummary,
							mood: moodEmoji,
					  }
					: note,
			);
			localStorage.setItem('notes', JSON.stringify(updated));
			alert('Note updated!');
		} else {
			const newNote: Note = {
				id: crypto.randomUUID(),
				title,
				content,
				summary: aiSummary,
				mood: moodEmoji,
			};
			localStorage.setItem(
				'notes',
				JSON.stringify([...existing, newNote]),
			);
			alert('Note saved!');
		}

		reset();
		setAiSummary('');
		setMoodEmoji('');
		if (setEditOrCreateNote) setEditOrCreateNote(false);
	};

	return (
		<div className='w-96 max-w-7xl mx-auto p-4'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='space-y-4 flex flex-col justify-between h-[96vh]'
			>
				<div className='flex items-center justify-between w-full'>
					<h2 className='text-lg font-bold'>
						{selectedNote
							? 'Update Note'
							: 'Create Note'}
					</h2>
					<div className='flex gap-2'>
						<button
							type='submit'
							className='font-semibold transition'
						>
							{selectedNote ? (
								<MdSave className='text-2xl' />
							) : (
								<CiCirclePlus className='text-2xl' />
							)}
						</button>
						<button
							type='button'
							onClick={() => {
								setEditOrCreateNote?.(false);
								setSelectedNote?.(undefined);
							}}
							className='font-semibold transition'
						>
							<CiCirclePlus className='text-2xl rotate-45 text-red-600' />
						</button>
					</div>
				</div>

				<input
					type='text'
					{...register('title')}
					className='w-full py-2 outline-0 font-bold text-xl'
					placeholder='Enter Title'
				/>

				<textarea
					{...register('content', { required: true })}
					className='w-full h-full py-2 min-h-[120px] grow outline-0 resize-none'
					placeholder='Write your note here...'
				/>

				{aiSummary ? (
					<div className='bg-gray-100 text-sm p-2 rounded'>
						<p className='font-semibold mb-1'>
							🧠 AI Summary:
						</p>
						<p>{aiSummary}</p>
					</div>
				) : (
					<button
						type='button'
						onClick={handleSummarize}
						className={`w-full py-2 px-3 text-sm  transition ${
							content || !summarizing
								? 'bg-purple-600 text-white rounded hover:bg-purple-700'
								: 'bg-purple-600/40 text-black'
						}`}
						disabled={!content || summarizing}
					>
						{summarizing
							? 'Summarizing...'
							: '🧠 Summarize'}
					</button>
				)}

				{moodEmoji && (
					<p
						className='text-2xl text-right'
						title='AI Detected Mood'
					>
						{moodEmoji}
					</p>
				)}
			</form>
		</div>
	);
};

export default NoteForm;
