import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { IoIosClose } from 'react-icons/io';
import { FaDownload } from 'react-icons/fa6';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import { useSelectedData } from './SelectedDataContext';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
		minWidth: '600px',
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));

export default function CustomizedDialogs({ premium }) {
	const { showPdfDownloadModal, setShowPdfDownloadModal } = useSelectedData();

	const handleClose = () => {
		setShowPdfDownloadModal(false);
	};

	return (
		<React.Fragment>
			<BootstrapDialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={showPdfDownloadModal}>
				<DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
					<h1 className="font-semibold text-2xl">Download Pdfs</h1>
					<p className="text-xs text-gray-500">
						Choose a format to download your reports.
					</p>
				</DialogTitle>

				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}>
					<IoIosClose />
				</IconButton>
				<DialogContent>
					<div className="flex p-8 gap-x-4 w-full">
						<div className="flex flex-col gap-y-8 flex-1 items-center">
							<div className="border-2 p-8">
								<img
									src="pdf.png"
									alt="pdf"
									className="h-16 w-16"
								/>
							</div>
							<button className="bg-red-600 text-white px-4 py-2 rounded-lg flex gap-x-2 items-center">
								<FaDownload />
								<p className="text-sm font-semibold">
									Pay & Download
								</p>
							</button>
						</div>
						<div className="flex flex-col gap-y-8 flex-1 items-center">
							<div className="border-2 border-yellow-500 p-8 relative">
								<img
									src="pdf.png"
									alt="pdf"
									className="h-16 w-16"
								/>
								<MdOutlineWorkspacePremium className="absolute top-1 right-1 h-10 w-10 text-yellow-500" />
							</div>
							<button className="bg-gradient-to-br from-yellow-400 via-yellow-600 to-transparent to-bottom-right, bg-gradient-to-tl from-yellow-100 via-yellow-200 to-[#5d4a1f] to-top-left text-white px-4 py-2 rounded-lg flex gap-x-2 items-center flex-1">
								<FaDownload />
								<p className="text-sm font-semibold">
									Upgrade Your Plan for a Free View!
								</p>
							</button>
						</div>
					</div>
				</DialogContent>
			</BootstrapDialog>
		</React.Fragment>
	);
}
