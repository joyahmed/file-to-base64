import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Image = () => {
	const [files, setFiles] = useState([]);
	const [copied, setCopied] = useState(false);

	const handleChange = e => {
		let files = e.target.files;

		let allFiles = [];
		for (let i = 0; i < files.length; i++) {
			let file = files[i];

			let reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = () => {
				let fileInfo = {
					name: file.name,
					url: reader.result
				};

				allFiles.push(fileInfo);
				setFiles(allFiles);
			};
		}
	};

	const clearImages = () => {
		console.log('Button clicked');
		setFiles(null);
	};
	return (
		<div className='flex flex-col items-center justify-center mt-10 w-full px-5'>
			<div
				className={`flex flex-row items-center ${
					files && files.length > 0
						? 'justify-between px-5 transittion-all duration-300 ease origin-center'
						: 'justify-center transittion-all duration-300 ease'
				} text-center w-full `}>
				<div>
					<input type='file' onChange={handleChange} multiple />
				</div>
				{files && files.length > 0 && (
					<div>
						<Button onClick={() => clearImages()} text='Clear Images' />
					</div>
				)}
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-3 w-full mx-2'>
				{files &&
					files.length > 0 &&
					files.map((file, index) => (
						<div
							key={index}
							className='justify-between my-5 text-xs text-white font-semibold px-5  overflow-hidden'>
							<div className='flex bg-gray-500 px-5 py-5 rounded-md shadow-md'>
								<img className='w-28 h-28 rounded-md' src={file.url} alt='' />
								<div className='flex flex-col justify-between px-5 py-1'>
									<div className='flex'>Name: {file.name}</div>
									<div className=''>Url: {file.url.substr(0, 40)}</div>
									<div className=''>
										<CopyToClipboard
											text={file.url}
											onCopy={() => setCopied(!copied)}>
											<Button text='Copy URL' />
										</CopyToClipboard>
									</div>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default Image;

const Button = ({ text, onClick }) => {
	return (
		<button
			onClick={onClick}
			className='bg-gray-400 px-2 py-1 rounded-md font-semibold'>
			{text}
		</button>
	);
};
