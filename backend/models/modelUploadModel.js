import mongoose from 'mongoose';

const modelUploadSchema = new mongoose.Schema({
    modelName: { type: String, required: true },
    uploadDate: { type: Date, required: true },
});

const ModelUpload = mongoose.models.ModelUpload || mongoose.model("ModelUpload", modelUploadSchema);
export default ModelUpload;
