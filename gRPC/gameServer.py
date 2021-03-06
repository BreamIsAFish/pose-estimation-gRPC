from concurrent import futures

import grpc
import time

import proto.pose_pb2 as pose
import proto.pose_pb2_grpc as rpc


# inheriting here from the protobuf rpc file which is generated
class ActionServer(rpc.ActionServerServicer):

    def __init__(self):
        # List with all the chat history
        self.actions = []

    # The stream which will be used to send new messages to clients
    def ActionStream(self, request_iterator, context):
        """
        This is a response-stream type call. This means the server can keep sending messages
        Every client opens this connection and waits for server to send new messages

        :param request_iterator:
        :param context:
        :return:
        """
        lastindex = 0
        # For every client a infinite loop starts (in gRPC's own managed thread)
        while True:
            # Check if there are any new messages
            while len(self.actions) > lastindex:
                n = self.actions[lastindex]
                lastindex += 1
                yield n

    def SendAction(self, request: pose.Action, context):
        """
        This method is called when a clients sends a Note to the server.

        :param request:
        :param context:
        :return:
        """
        # this is only for the server console
        print("Posting: {}".format(request.name))
        # Add it to the chat history
        self.actions.append(request)
        # something needs to be returned required by protobuf language, we just return empty msg
        return pose.Empty()


if __name__ == '__main__':
    port = 5001  # a random port for the server to run on
    # the workers is like the amount of threads that can be opened at the same time, when there are 10 clients connected
    # then no more clients able to connect to the server.
    server = grpc.server(futures.ThreadPoolExecutor(
        max_workers=10))  # create a gRPC server
    rpc.add_ActionServerServicer_to_server(
        ActionServer(), server)  # register the server to gRPC
    # gRPC basically manages all the threading and server responding logic, which is perfect!
    print('Starting server. Listening...')
    server.add_insecure_port('[::]:' + str(port))
    server.start()
    # Server starts in background (in another thread) so keep waiting
    # if we don't wait here the main thread will end, which will end all the child threads, and thus the threads
    # from the server won't continue to work and stop the server
    while True:
        time.sleep(64 * 64 * 100)
