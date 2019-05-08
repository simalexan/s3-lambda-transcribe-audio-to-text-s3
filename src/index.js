const AWS = require('aws-sdk'),
  transcribe = new AWS.TranscribeService(),
  path = require('path'),
  LANGUAGE_CODE = process.env.LANGUAGE_CODE,
  OUTPUT_BUCKET = process.env.OUTPUT_BUCKET;

exports.handler = (event, context) => {
  const eventRecord = event.Records && event.Records[0],
    inputBucket = eventRecord.s3.bucket.name,
    key = eventRecord.s3.object.key,
    id = context.awsRequestId;

  let extension = path.extname(key);
  extension = extension.substr(1, extension.length);

  console.log('converting from ', `https://${inputBucket}.s3.amazonaws.com/${key}`, extension);

  if (!['mp3', 'mp4', 'wav', 'flac'].includes(extension)) {
    throw 'Invalid file extension, the only supported AWS Transcribe file types are MP3, MP4, WAV, FLAC.';
  }

  const fileUri = `https://${inputBucket}.s3.amazonaws.com/${key}`,
    jobName = `s3-lambda-audio-transcribe-${id}`;

  const params = {
    LanguageCode: LANGUAGE_CODE,
    Media: {
      MediaFileUri: fileUri
    },
    MediaFormat: extension,
    TranscriptionJobName: jobName,
    OutputBucketName: OUTPUT_BUCKET
  };

  return transcribe.startTranscriptionJob(params).promise();
};
