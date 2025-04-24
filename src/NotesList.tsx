import React, { useEffect, useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';

type Note = {
	id: string;
	title: string;
	content: string;
};

type Props = {
	onSelectNote: (note: Note) => void;
	setEditOrCreateNote?: (data: boolean) => void;
};

const NotesList: React.FC<Props> = ({ onSelectNote, setEditOrCreateNote }) => {
	const [notes, setNotes] = useState<Note[]>([]);
	const [query, setQuery] = useState('');

	const fetchNotes = () => {
		const stored = localStorage.getItem('notes');
		if (stored) setNotes(JSON.parse(stored));
	};

	useEffect(() => {
		fetchNotes();
	}, []);

	const deleteNote = (id: string) => {
		const updated = notes.filter((note) => note.id !== id);
		setNotes(updated);
		localStorage.setItem('notes', JSON.stringify(updated));
	};

	const filteredNotes = notes.filter((note) =>
		note.title.toLowerCase().includes(query.toLowerCase()),
	);

	return (
		<aside className='w-96 mx-auto bg-white h-full overflow-auto p-4'>
			<div className='flex justify-between items-center border-b border-black/40'>
				<h2 className='text-lg font-bold text-blue-700'>
					Saved Notes
				</h2>
				<CiCirclePlus
					onClick={() => {
						if (setEditOrCreateNote)
							setEditOrCreateNote(true);
					}}
					className='text-2xl cursor-pointer'
					title='Create New Note'
				/>
			</div>
			<div className='mt-4'>
				<input
					type='text'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder='Search title...'
					className='w-full p-2 border border-black/40 rounded text-sm outline-0'
				/>
			</div>

			<ul className='space-y-2 mt-4'>
				{filteredNotes.map((note) => (
					<li
						key={note.id}
						className='relative cursor-pointer text-sm hover:text-blue-600 border border-black/40 hover:border-blue-600/40 p-2 rounded group transition-all duration-300 ease-in-out'
					>
						<div
							onClick={() => onSelectNote(note)}
							title={note.title}
						>
							<h2 className='text-md font-bold truncate'>
								{note.title}
							</h2>
							<p className='text-xs text-gray-600 line-clamp-2'>
								{note.content}
							</p>
						</div>
						<button
							onClick={() => deleteNote(note.id)}
							className='absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity'
							title='Delete Note'
						>
							<MdDelete className='text-xl cursor-pointer' />
						</button>
					</li>
				))}
			</ul>
		</aside>
	);
};

export default NotesList;
