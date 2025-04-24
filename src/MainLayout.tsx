import React, { useEffect, useState } from 'react';
import NoteForm, { Note } from './NoteForm';
import Sidebar from './Sidebar';

const MainLayout: React.FC = () => {
	const [editOrCreateNote, setEditOrCreateNote] = useState(false);
	const [selectedNote, setSelectedNote] = useState<Note | undefined>(
		undefined,
	);

	useEffect(() => {
		if (!selectedNote) return;
		setEditOrCreateNote(true);
	}, [selectedNote]);

	return (
		<div className='flex flex-col md:flex-row h-[90vh] relative'>
			{!editOrCreateNote ? (
				<Sidebar
					onSelectNote={setSelectedNote}
					setEditOrCreateNote={setEditOrCreateNote}
				/>
			) : (
				<NoteForm
					selectedNote={selectedNote}
					setEditOrCreateNote={setEditOrCreateNote}
					setSelectedNote={setSelectedNote}
				/>
			)}
		</div>
	);
};

export default MainLayout;
