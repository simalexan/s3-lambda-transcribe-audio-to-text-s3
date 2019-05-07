const AWS = require('aws-sdk'),
  transcribe = new AWS.TranscribeService(),
  path = require('path'),
  LANGUAGE_CODE = process.env.LANGUAGE_CODE,
  OUTPUT_BUCKET = process.env.OUTPUT_BUCKET;

exports.handler = async (event, context) => {
  const eventRecord = event.Records && event.Records[0],
    inputBucket = eventRecord.s3.bucket.name,
    key = eventRecord.s3.object.key,
    id = context.awsRequestId,
    extension = path.extname(key);

  console.log('converting from ', `https://${inputBucket}.s3.amazonaws.com/${key}`, extension);

  if (['mp3', 'mp4', 'wav', 'flac'].includes(extension)) {
    throw new Error('Invalid file extension, the only supported AWS Transcribe file types are MP3, MP4, WAV, FLAC.')
  }

  const params = {
    LanguageCode: LANGUAGE_CODE,
    Media: {
      MediaFileUri: `https://${inputBucket}.s3.amazonaws.com/${key}`
    },
    MediaFormat: extension,
    TranscriptionJobName: `s3-lambda-audio-transcribe-${id}`,
    OutputBucketName: OUTPUT_BUCKET
  }

  return await transcribe.startTranscriptionJob(params);
};
