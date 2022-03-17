import threading

import grpc

import proto.chat_pb2 as chat
import proto.chat_pb2_grpc as rpc

address = '0.0.0.0'
port = 5001


class Client:

    def __init__(self, u: str):
        # the frame to put ui components on
        # self.window = window
        self.username = u
        # create a gRPC channel + stub
        channel = grpc.insecure_channel(address + ':' + str(port))
        print("\n\n\n")
        print(channel)
        self.conn = rpc.ChatServerStub(channel)
        print(self.conn)
        print("\n\n\n")
        # create new listening thread for when new message streams come in
        threading.Thread(target=self.__listen_for_messages,
                         daemon=True).start()

    def __listen_for_messages(self):
        """
        This method will be ran in a separate thread as the main/ui thread, because the for-in call is blocking
        when waiting for new messages
        """
        print("\n\n\n")
        # this line will wait for new messages from the server!
        for note in self.conn.ChatStream(chat.Empty()):
            # debugging statement
            if(self.username != note.name):
                print("R[{}] {}".format(note.name, note.message))
            # self.chat_list.insert(END, "[{}] {}\n".format(
            #     note.name, note.message))  # add the message to the UI
        print("\n\n\n")

    def send_message(self, message):
        """
        This method is called when user enters something into the textbox
        """
        # message = self.entry_message.get()  # retrieve message from the UI
        if message is not '':
            n = chat.Note()  # create protobug message (called Note)
            n.name = self.username  # set the username
            n.message = message  # set the actual message of the note
            # print("S[{}] {}".format(n.name, n.message))  # debugging statement
            self.conn.SendNote(n)  # send the Note to the server


if __name__ == '__main__':
    # root = Tk()  # I just used a very simple Tk window for the chat UI, this can be replaced by anything
    # frame = Frame(root, width=300, height=300)
    # frame.pack()
    # root.withdraw()
    username = input("Enter username: ")
    # while username is None:
    # retrieve a username so we can distinguish all the different clients
    # username = simpledialog.askstring(
    #     "Username", "What's your username?", parent=root)
    # root.deiconify()  # don't remember why this was needed anymore...
    # this starts a client and thus a thread which keeps connection to server open
    print(f'Welcome {username}!')
    c = Client(username)

    msg = ''
    while(True):
        msg = input()
        c.send_message(msg)
