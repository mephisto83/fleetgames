//
//  EXFaceDetectorManager.h
//  Exponent
//
//  Created by Stanisław Chmiela on 22.11.2017.
//  Copyright © 2017 650 Industries. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>
#import <GoogleMobileVision/GoogleMobileVision.h>
#import <GoogleMVDataOutput/GoogleMVDataOutput.h>

@protocol EXFaceDetectorDelegate
- (void)onFacesDetected:(NSArray<NSDictionary *> *)faces;
@end

@interface EXFaceDetectorManager : NSObject

- (NSDictionary *)constantsToExport;

- (instancetype)initWithSessionQueue:(dispatch_queue_t)sessionQueue delegate:(id <EXFaceDetectorDelegate>)delegate;

- (void)setIsEnabled:(id)json;
- (void)setLandmarksDetected:(id)json;
- (void)setClassificationsDetected:(id)json;
- (void)setMode:(id)json;

- (void)maybeStartFaceDetectionOnSession:(AVCaptureSession *)session withPreviewLayer:(AVCaptureVideoPreviewLayer *)previewLayer;
- (void)stopFaceDetection;

@end
