import React, { useState, useEffect, useRef } from 'react'
import uniqid from 'uniqid';
import Quill from 'quill';
import { assets } from '../../assets/assets';

const AddCourse = () => {

const quillRef = useRef(null);
const editorRef = useRef(null);

const [courseTitle, setCourseTitle] = useState('');
const [coursePrice, setCoursePrice] = useState(0);
const [discount, setDiscount] = useState(0);
const [image, setImage] = useState(null);
const [chapters, setChapters] = useState([]);
const [showPopup, setShowPopup] = useState(false);
const [currentChapterId, setCurrentChapterId] = useState(null);
const [isAddingChapter, setIsAddingChapter] = useState(false);

const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
});

const [newChapterTitle, setNewChapterTitle] = useState('');

useEffect(() => {
    if (!quillRef.current && editorRef.current) {
        quillRef.current = new Quill(editorRef.current, {
            theme: 'snow',
        });
    }
}, []);

const addChapter = () => {
    if (newChapterTitle.trim() === '') return;
    
    const newChapter = {
        id: uniqid(),
        chapterId: uniqid(),
        title: newChapterTitle,
        collapsed: false,
        ChapterContent: []
    };
    
    setChapters([...chapters, newChapter]);
    setNewChapterTitle('');
    setIsAddingChapter(false);
};

const deleteChapter = (chapterId) => {
    setChapters(chapters.filter(chapter => chapter.id !== chapterId));
};

const toggleChapter = (chapterId) => {
    setChapters(chapters.map(chapter => 
        chapter.id === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter
    ));
};

const addLecture = () => {
    setChapters(
        chapters.map((chapter) => {
            if (chapter.id === currentChapterId) {
                const newLecture = {
                    ...lectureDetails,
                    lectureOrder: chapter.ChapterContent.length > 0 
                        ? chapter.ChapterContent.slice(-1)[0].lectureOrder + 1 
                        : 1,
                    lectureId: uniqid()
                };
                return {
                    ...chapter,
                    ChapterContent: [...chapter.ChapterContent, newLecture]
                };
            }
            return chapter;
        })
    );
    
    setShowPopup(false);
    setCurrentChapterId(null);
    setLectureDetails({
        lectureTitle: '',
        lectureDuration: '',
        lectureUrl: '',
        isPreviewFree: false,
    });
};

const deleteLecture = (chapterId, lectureId) => {
    setChapters(chapters.map(chapter => 
        chapter.id === chapterId ? {
            ...chapter,
            ChapterContent: chapter.ChapterContent.filter(lecture => lecture.lectureId !== lectureId)
        } : chapter
    ));
};

return (
    <div className='h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
        <form className='flex flex-col gap-4 max-w-md w-full text-gray-500'>
            {/* Course Title */}
            <div className='flex flex-col gap-1'>
                <p>Course Title</p>
                <input 
                    onChange={e => setCourseTitle(e.target.value)} 
                    value={courseTitle}
                    type="text" 
                    placeholder="Type here" 
                    className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500" 
                    required 
                />
            </div>
            
            {/* Course Description */}
            <div className='flex flex-col gap-1'>
                <p>Course Description</p>
                <div ref={editorRef} className="border rounded min-h-[100px]"></div>
            </div>

            {/* Course Price, Discount & Thumbnail */}
            <div className='flex items-center justify-between flex-wrap gap-4'>
                <div className='flex flex-col gap-1'>
                    <p>Course Price</p>
                    <input 
                        onChange={e => setCoursePrice(e.target.value)} 
                        value={coursePrice}
                        type="number" 
                        placeholder='0' 
                        className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500' 
                        required 
                    />
                </div>

                <div className='flex flex-col gap-1'>
                    <p>Discount %</p>
                    <input 
                        onChange={e => setDiscount(e.target.value)} 
                        value={discount}
                        type="number" 
                        placeholder="0" 
                        min={0} 
                        max={100} 
                        className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500" 
                        required 
                    />
                </div>

                <div className='flex md:flex-row flex-col items-center gap-3'>
                    <p>Course Thumbnail</p>
                    <label htmlFor='thumbnailImage' className='flex items-center gap-3 cursor-pointer'>
                        <img 
                            src={assets.file_upload_icon} 
                            alt="Upload icon" 
                            className='p-3 bg-blue-500 rounded' 
                        />
                        <input 
                            type="file" 
                            id='thumbnailImage' 
                            onChange={e => setImage(e.target.files[0])} 
                            accept="image/*" 
                            hidden 
                        />
                        {image && (
                            <img 
                                className='max-h-10' 
                                src={URL.createObjectURL(image)} 
                                alt="Thumbnail preview" 
                            />
                        )}
                    </label>
                </div>
            </div>

            {/* Add Chapter Button */}
            <div className="mt-4">
                <button 
                    type="button"
                    onClick={() => setIsAddingChapter(true)} 
                    className="w-full bg-blue-100 text-blue-600 py-3 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                >
                    + Add Chapter
                </button>
            </div>

            {/* New Chapter Input */}
            {isAddingChapter && (
                <div className="flex gap-2 items-center bg-gray-50 p-3 rounded-lg border">
                    <input
                        type="text"
                        placeholder="Enter chapter title..."
                        value={newChapterTitle}
                        onChange={(e) => setNewChapterTitle(e.target.value)}
                        className="flex-1 outline-none py-2 px-3 rounded border border-gray-300"
                    />
                    <button
                        type="button"
                        onClick={addChapter}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setIsAddingChapter(false);
                            setNewChapterTitle('');
                        }}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            )}

            {/* Chapters List */}
            {chapters.map((chapter, chapterIndex) => (
                <div key={chapter.id} className="bg-white border rounded-lg">
                    <div className="flex justify-between items-center p-4">
                        <div className="flex items-center cursor-pointer" onClick={() => toggleChapter(chapter.id)}>
                            <svg 
                                className={`w-4 h-4 mr-2 transition-transform ${chapter.collapsed ? 'rotate-0' : 'rotate-90'}`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="font-semibold text-gray-700">
                                {chapterIndex + 1} {chapter.title}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-gray-500 text-sm">
                                {chapter.ChapterContent?.length || 0} Lectures
                            </span>
                            <button 
                                type="button"
                                onClick={() => deleteChapter(chapter.id)}
                                className="text-gray-400 hover:text-red-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    {/* Lectures List */}
                    {!chapter.collapsed && chapter.ChapterContent && chapter.ChapterContent.length > 0 && (
                        <div className="px-4 pb-2">
                            {chapter.ChapterContent.map((lecture, lectureIndex) => (
                                <div key={lecture.lectureId} className="flex items-center justify-between py-2 border-t">
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-400 text-sm">{lectureIndex + 1}.</span>
                                        <span className="text-gray-700">{lecture.lectureTitle}</span>
                                        <span className="text-gray-500 text-sm">- {lecture.lectureDuration} mins</span>
                                        <span className="text-blue-500 text-sm">- Link</span>
                                        {lecture.isPreviewFree && (
                                            <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded">Free Preview</span>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => deleteLecture(chapter.id, lecture.lectureId)}
                                        className="text-gray-400 hover:text-red-500"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {/* Add Lecture Button */}
                    {!chapter.collapsed && (
                        <div className="px-4 pb-4">
                            <button 
                                type="button"
                                onClick={() => {
                                    setCurrentChapterId(chapter.id);
                                    setShowPopup(true);
                                }}
                                className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                            >
                                + Add Lecture
                            </button>
                        </div>
                    )}
                </div>
            ))}

            {/* Create Course Button */}
            <button 
                type="submit" 
                className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors mt-4 font-medium"
            >
                Create Course
            </button>
        </form>

        {/* Add Lecture Popup */}
        {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full">
                    <h3 className="text-lg font-semibold mb-4">Add Lecture</h3>
                    <div className="flex flex-col gap-3">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Lecture Title</p>
                            <input 
                                type="text" 
                                placeholder="What is JS" 
                                className="w-full outline-none py-2 px-3 rounded border border-gray-300"
                                value={lectureDetails.lectureTitle}
                                onChange={(e) => setLectureDetails({...lectureDetails, lectureTitle: e.target.value})}
                            />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Duration (minutes)</p>
                            <input 
                                type="number" 
                                placeholder="30" 
                                className="w-full outline-none py-2 px-3 rounded border border-gray-300"
                                value={lectureDetails.lectureDuration}
                                onChange={(e) => setLectureDetails({...lectureDetails, lectureDuration: e.target.value})}
                            />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Lecture URL</p>
                            <input 
                                type="text" 
                                placeholder="google.com" 
                                className="w-full outline-none py-2 px-3 rounded border border-gray-300"
                                value={lectureDetails.lectureUrl}
                                onChange={(e) => setLectureDetails({...lectureDetails, lectureUrl: e.target.value})}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                id="previewFree"
                                checked={lectureDetails.isPreviewFree}
                                onChange={(e) => setLectureDetails({...lectureDetails, isPreviewFree: e.target.checked})}
                            />
                            <label htmlFor="previewFree" className="text-sm text-gray-600">Is Preview Free?</label>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <button 
                            type="button"
                            onClick={addLecture}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex-1"
                        >
                            Add
                        </button>
                        <button 
                            type="button"
                            onClick={() => {
                                setShowPopup(false);
                                setCurrentChapterId(null);
                                setLectureDetails({
                                    lectureTitle: '',
                                    lectureDuration: '',
                                    lectureUrl: '',
                                    isPreviewFree: false,
                                });
                            }}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
)
}

export default AddCourse