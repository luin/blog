---
title: "Kuber Help"
permalink: /apps/kuber-help
layout: single
author_profile: true
---

<p>To add a Kubernetes cluster manually (currently supporting Kubernetes version >= 1.9) to Kuber in order to manage it from your mobile device, you need to collect two parameters. One is the API server address of the Kubernetes cluster, and the other is the authentication information that API server is required.</p>
<p>Typically you can ask these information from the one who set up the cluster. But here are some methods that may help you start quicker by yourself:</p>
<div class="section">
  <h2>Kubectl</h2>
  <p>If you can access Kubernetes via kubectl, all you need is to invoke <code>kubectl config view --raw</code>(or simply <code>cat ~/.kube/config</code>). The api server address shows as <code>clusters[].cluster.server</code>in the output.</p>
  <p>You are also able to find the authentication information from the output via <code>users[].user</code>. Kubernetes support multiple authentication methods, so the information may vary:</p>
  <ol>
    <li><code>token</code>property: The authentication method is "Token" and the value of this property is the token.</li>
    <li><code>username</code>&amp;<code>password</code>properties: The authentication method is "Credentials".</li>
    <li><code>client-certificate</code>&amp; <code>client-key</code>properties: The authentication method is "Certificate". Kuber requires a P12 format file for security. You can run <code>openssl pkcs12 -export -out keystore.p12 -inkey /path/to/client-key -in /path/to/client-certificate</code>to generate one (Kuber supports password-protected-p12, so you can optionally specify a password in the above command). The generated file "keystore.p12" is what we need. Now get the base64 format of it (<code>echo keystore.p12 | base64</code>) and paste it to Kuber.</li>
    <li><code>client-certificate-data</code>&amp; <code>client-key-data</code>properties: This is pretty similar to the above case. The only difference is this case the values are data instead of file paths. You can simply save the data as files and do just like above.</li>
    <li><code>exec</code>and the <code>command</code>is "aws-iam-authenticator": The cluster is likely hosted by AWS EKS. You can get the endpoint &amp; cluster id from the AWS EKS dashboard (see the picture below, cluster id is "test"). And you need to fill with your AWS access ID and secret key.<img src="aws.png" /></li>
    <li>Other cases. The authentication is not supported by Kuber currently. Send us an email (kuber@nssurge.com) to let us know and we will try to add it as fast as we can. At the same time, you may want to ask the cluster owner to setup other authentications that Kuber supporting.</li>
  </ol>
</div>
<div class="section">
  <h2>Rancher</h2>
  <p>If you cluster have installed Rancher, you can find Kubeconfig on the rancher dashboard (see the picture below), and then you can follow the instructions above.</p>
  <p><img src="rancher.png" /></p>
</div>